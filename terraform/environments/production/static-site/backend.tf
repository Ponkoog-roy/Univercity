# Values here must match bootstrap/state-backend's outputs exactly.
# Terraform does not allow variables in a backend block, so these are
# literal — fill them in once after running bootstrap, and update if the
# state bucket/table are ever recreated.
terraform {
  backend "s3" {
    bucket         = "REPLACE-WITH-bootstrap-output.state_bucket_name"
    key            = "env:/production/static-site/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "REPLACE-WITH-bootstrap-output.lock_table_name"
    encrypt        = true
  }
}
