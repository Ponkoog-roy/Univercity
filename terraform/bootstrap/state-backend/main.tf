# WHY: every other root module needs a remote backend to exist before it can
# use one. This is the one piece of the repo that intentionally uses a LOCAL
# state file — run it once per AWS account, commit nothing sensitive, and
# never re-run destroy on this without destroying every environment first.
#
# WHAT: an S3 bucket for state (versioned + encrypted + public-access-blocked)
# and a DynamoDB table for state locking, shared by both tracks and every
# environment (each environment uses a distinct state *key*, not a distinct
# bucket).
#
# DEPENDENCIES: none — this is the root of the dependency graph.
#
# VERIFICATION: after apply, confirm the bucket has versioning=Enabled and
# public access fully blocked (`aws s3api get-public-access-block`), and that
# the DynamoDB table's billing mode is PAY_PER_REQUEST (no capacity to size
# for a lock table used a few times a day).

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "state" {
  bucket = var.state_bucket_name

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "lock" {
  name         = var.lock_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
