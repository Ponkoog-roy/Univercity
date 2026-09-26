# WHY: this is the root module for the portfolio/demo cluster. It's
# expected to be applied for a demo session and destroyed afterward
# (`terraform destroy`) rather than left running — the whole point of
# keeping it a separate track from production/static-site is that
# destroying this touches nothing real.
#
# WHAT: wires vpc -> eks -> k8s-addons together, plus its own ECR repo.
# The kubernetes/helm providers are configured here using an exec-based
# auth plugin (aws eks get-token) rather than a static token, so
# credentials are never written to state.
#
# DEPENDENCIES: bootstrap/state-backend. Reuses the SAME Route53 zone as
# production (create_zone = false, data-source lookup) rather than
# creating a second zone for the same domain.
#
# VERIFICATION: after apply, `aws eks update-kubeconfig --name
# univercity-portfolio` then `kubectl get nodes,pods -A` should show a
# healthy cluster with pods in kube-system, argocd, and monitoring.

provider "aws" {
  region = var.region
}

data "aws_eks_cluster_auth" "this" {
  name = module.eks.cluster_name
}

provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.this.token
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.this.token
  }
}

module "dns_zone" {
  source      = "../../../modules/dns-zone"
  domain_name = var.root_domain
  create_zone = false # production/static-site already owns this zone
}

module "vpc" {
  source = "../../../modules/vpc"
  name   = "univercity-portfolio"
  tags   = local.tags
}

module "eks" {
  source              = "../../../modules/eks"
  name                = "univercity-portfolio"
  private_subnet_ids  = module.vpc.private_subnet_ids
  public_subnet_ids   = module.vpc.public_subnet_ids
  node_instance_types = var.node_instance_types
  use_spot            = var.use_spot
  desired_size        = var.desired_size
  tags                = local.tags
}

module "ecr" {
  source = "../../../modules/ecr"
  name   = "univercity"
  tags   = local.tags
}

module "k8s_addons" {
  source            = "../../../modules/k8s-addons"
  cluster_name      = module.eks.cluster_name
  oidc_provider_arn = module.eks.oidc_provider_arn
  oidc_provider_url = module.eks.oidc_provider_url
}

locals {
  tags = {
    Project     = "univercity"
    Environment = "portfolio"
    Track       = "eks-demo"
    ManagedBy   = "terraform"
  }
}
