output "zone_id" {
  value = var.create_zone ? aws_route53_zone.this[0].zone_id : data.aws_route53_zone.existing[0].zone_id
}

output "name_servers" {
  value       = var.create_zone ? aws_route53_zone.this[0].name_servers : data.aws_route53_zone.existing[0].name_servers
  description = "Point your domain registrar's NS records at these if create_zone = true."
}
