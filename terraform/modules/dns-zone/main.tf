# WHY: both tracks need a Route53 zone_id but only one zone should exist
# per root domain — creating it in two places would fight over ownership.
# This module is a thin wrapper so whichever environment owns the zone
# creates it once, and the other environment reads it via a data source
# (see environments/portfolio/eks-demo/main.tf, which uses the data-source
# path with create_zone = false).
#
# WHAT: a Route53 public hosted zone, created only when create_zone = true.
#
# DEPENDENCIES: none to create; if create_zone = false, depends on the zone
# already existing in the account under the given domain_name.
#
# VERIFICATION: `dig NS <domain_name>` should return the same 4 nameservers
# as this module's `name_servers` output, and your registrar's NS records
# should point at them (this module does not touch the registrar — that's
# a manual step outside AWS for a domain not bought through Route53).

resource "aws_route53_zone" "this" {
  count = var.create_zone ? 1 : 0
  name  = var.domain_name
  tags  = var.tags
}

data "aws_route53_zone" "existing" {
  count = var.create_zone ? 0 : 1
  name  = var.domain_name
}
