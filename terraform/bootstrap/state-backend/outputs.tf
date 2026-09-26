output "state_bucket_name" {
  value       = aws_s3_bucket.state.bucket
  description = "Pass this into every environment's backend.tf bucket field."
}

output "lock_table_name" {
  value       = aws_dynamodb_table.lock.name
  description = "Pass this into every environment's backend.tf dynamodb_table field."
}
