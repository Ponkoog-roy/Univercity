output "bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Target this in the CI deploy step's `aws s3 sync` command."
}

output "distribution_id" {
  value       = aws_cloudfront_distribution.site.id
  description = "Needed for the CI deploy step's cache invalidation call."
}

output "distribution_domain_name" {
  value       = aws_cloudfront_distribution.site.domain_name
  description = "The *.cloudfront.net domain, useful for testing before DNS cutover."
}

output "site_url" {
  value       = "https://${var.domain_name}"
  description = "The public URL once DNS + cert validation have propagated."
}
