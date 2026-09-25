# Phase 4 — EKS Implementation (Portfolio Track)

```
k8s/
├── base/                 # kustomize base: namespaces, deployment, service,
│                         # ingress, hpa, pdb, networkpolicy, configmap
├── overlays/
│   ├── dev/              # 1 replica, dev.univercity.example.com
│   ├── staging/          # 2-4 replicas, staging.univercity.example.com
│   └── prod/             # 3+ replicas, univercity.example.com, WAF attached
├── addons/               # cluster-autoscaler.yaml + Helm install commands
│                         # for metrics-server, AWS LB Controller, ExternalDNS
├── monitoring/           # kube-prometheus-stack Helm values
└── argocd/               # app-of-apps + one Application per environment
```

## Local verification (before ArgoCD ever sees it)
```bash
kubectl kustomize k8s/overlays/dev      # renders — no cluster needed
kubectl kustomize k8s/overlays/staging
kubectl kustomize k8s/overlays/prod

# dry-run against a real (or kind/minikube) cluster
kubectl apply --dry-run=server -k k8s/overlays/dev
```

## Bring-up order
1. `terraform apply` the `eks` module (creates the cluster + IRSA roles for
   the addons below — see `addons/README.md` for the exact IAM policies each
   role needs).
2. Install addons in the order listed in `addons/README.md`.
3. `kubectl apply -f k8s/argocd/app-of-apps.yaml` (assumes ArgoCD itself is
   already installed in the `argocd` namespace — that's a separate Helm
   release, `argo-cd/argo-cd`, not covered here since it's a one-time
   cluster bootstrap step rather than part of this app's GitOps tree).
4. ArgoCD picks up `argocd/applications/*.yaml` and reconciles dev + staging
   automatically; prod waits for an explicit `argocd app sync univercity-prod`.

## What's intentionally NOT here
- No `Secret` manifests — Phase 3 already moved the Grafana password to a
  generated Kubernetes Secret via Terraform; this repo only *references* it
  (`existingSecret`), it never creates or stores it.
- No RDS/ECS/backend manifests — Phase 2 confirmed the app has no backend
  tier (Supabase is external), so there's nothing to deploy for it.
- No Ingress-NGINX — the ALB Ingress Controller is the ingress path per the
  Phase 2 architecture decision (ALB, not a self-managed load balancer).
