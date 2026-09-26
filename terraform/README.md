# Univercity — Terraform

This repo is deliberately split into two independent tracks that never share
runtime infrastructure. They share only the Terraform state backend
(bootstrap/) and, optionally, a single Route53 hosted zone.

## Track A — production/static-site  (WHY: this is what actually serves users)
S3 (private) -> CloudFront (OAC) -> Route53 -> ACM -> WAF
No compute, no cluster, no container. This is the live production path for
the React SPA. See environments/production/static-site.

## Track B — portfolio/eks-demo  (WHY: resume/skills demonstration only)
GitHub Actions -> ECR -> ArgoCD -> EKS -> ALB -> Prometheus/Grafana -> HPA
Not load-bearing for the real site. Exists to demonstrate Kubernetes,
GitOps, autoscaling, and observability. Treated as a lab environment:
expected to be scaled to zero / destroyed between demos to control cost.
See environments/portfolio/eks-demo.

## What's intentionally NOT here
- RDS, ECS, a backend/API tier: no backend service exists today (Supabase
  is the backend). Adding these now would be infra with no calling code.
- A dedicated secrets-manager module: the only "secret" in this app today
  is a public Supabase anon key, which is a build-time Vite env var, not
  infrastructure state. It's injected via GitHub Actions repository
  secrets at build time (Track A) or a Kubernetes Secret applied outside
  Terraform (Track B). Revisit this the day a real backend credential
  (DB password, service-role key) needs to exist.
- A dedicated backup module: Track A has no stateful data beyond the S3
  bucket, covered by S3 versioning. Track B has no persistent volumes.
  Revisit if either track gains a database or PVC.
- security-groups as a standalone module: Track B has exactly two SG
  concerns (node-to-node, ALB-to-node), defined inline in modules/eks and
  modules/vpc rather than as a separate module — splitting them out would
  add indirection without reuse value at this scale.

## Layout
    bootstrap/state-backend/   one-time: S3 state bucket + DynamoDB lock table
    modules/                   reusable building blocks, one concern each
    environments/<track>/<env>/  root modules that wire modules together per environment
    shared/                    provider/version pins reused by every root module
    pipelines/.github/workflows/  CI: plan on PR, apply on merge, per track

## State strategy
One S3 bucket (versioned, encrypted) + one DynamoDB table for locking,
created once via bootstrap/state-backend using a *local* backend (chicken-
and-egg: the backend can't store its own state remotely on first apply).
Every environment gets its own state *key* in the same bucket:
    env:/production/static-site/terraform.tfstate
    env:/portfolio/eks-demo/terraform.tfstate
This keeps one backend to operate while fully isolating blast radius
between tracks and environments (a `terraform apply` in one can never
touch the other's state).

## tfvars strategy
Each environment ships a `terraform.tfvars.example` — copy to
`terraform.tfvars` (gitignored) for local runs, or pass values as
`-var` / `TF_VAR_*` from CI. Nothing in a committed tfvars file should
ever be a secret; today nothing in either track's tfvars rises to that
level (domain names, instance sizes, replica counts — all fine to commit
in the `.example` file and even in a real tfvars file).

## Verification
This environment has no network access to registry.terraform.io, so none
of this has been run through `terraform init/validate/plan`. Before first
apply: `terraform fmt -recursive`, `terraform init`, `terraform validate`,
then `terraform plan` and read it end to end — don't skip that reading on
a first apply against a real AWS account.
