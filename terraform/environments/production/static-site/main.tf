# WHY: this is the root module that actually gets applied for the live
# production site. It wires together dns-zone (create once) and
# static-site (S3/CloudFront/ACM/WAF) with real values.
#
# WHAT: see modules/dns-zone and modules/static-site for the resources
# themselves — this file only supplies environment-specific inputs and
# the two-provider setup CloudFront/ACM require (default region + a
# us-east-1 alias, needed even if var.region is already us-east-1, so the
# alias always exists for the module to reference).
#
# DEPENDENCIES: bootstrap/state-backend must be applied first — this
# module's backend.tf reads its bucket/table names.
#
# VERIFICATION: after apply, run the CI deploy workflow once, then
# `curl -sI https://<domain_name>` and confirm HTTP 200 + a valid cert.

provider "aws" {
  region = var.region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

module "dns_zone" {
  source      = "../../../modules/dns-zone"
  domain_name = var.root_domain
  create_zone = var.create_zone
  tags        = local.tags
}

module "static_site" {
  source = "../../../modules/static-site"
  providers = {
    aws.us_east_1 = aws.us_east_1
  }

  name        = "univercity-prod"
  bucket_name = var.bucket_name
  domain_name = var.site_domain
  zone_id     = module.dns_zone.zone_id
  price_class = var.price_class
  tags        = local.tags
}

locals {
  tags = {
    Project     = "univercity"
    Environment = "production"
    Track       = "static-site"
    ManagedBy   = "terraform"
  }
}
