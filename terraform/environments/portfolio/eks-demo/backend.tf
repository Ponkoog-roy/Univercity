terraform {
  backend "s3" {
    bucket         = "REPLACE-WITH-bootstrap-output.state_bucket_name"
    key            = "env:/portfolio/eks-demo/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "REPLACE-WITH-bootstrap-output.lock_table_name"
    encrypt        = true
  }
}
