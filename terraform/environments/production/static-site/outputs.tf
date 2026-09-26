output "site_url" {
  value = module.static_site.site_url
}

output "bucket_name" {
  value = module.static_site.bucket_name
}

output "distribution_id" {
  value = module.static_site.distribution_id
}

output "name_servers" {
  value       = module.dns_zone.name_servers
  description = "Point your domain registrar at these if create_zone = true."
}
