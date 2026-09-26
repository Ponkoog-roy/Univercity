variable "region" {
  description = "AWS region for the state bucket and lock table."
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "Globally-unique S3 bucket name for Terraform state. Bucket names are global across ALL AWS accounts, so this must be unique (e.g. include an account ID or org name)."
  type        = string
}

variable "lock_table_name" {
  description = "DynamoDB table name used for state locking."
  type        = string
  default     = "univercity-terraform-locks"
}
