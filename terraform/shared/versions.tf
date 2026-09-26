# WHY: pinning provider versions per environment (copy this file into each
# environments/<track>/<env>/ directory — Terraform doesn't support shared
# includes across root modules) keeps `terraform init` from silently pulling
# a newer major provider version that changes resource schemas underneath
# you between two people's laptops or between local and CI runs.
#
# WHAT: version constraints for every provider used anywhere in the repo.
# Not every root module uses every provider — environments/production only
# needs aws; environments/portfolio additionally needs kubernetes and helm
# to configure the cluster after EKS creates it.
#
# DEPENDENCIES: none.
#
# VERIFICATION: `terraform version` and `terraform providers` after init
# should show versions matching these constraints exactly.

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.31"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.14"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}
