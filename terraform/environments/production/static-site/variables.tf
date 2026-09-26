variable "region" {
  type    = string
  default = "us-east-1"
}

variable "root_domain" {
  description = "Root domain owned in Route53, e.g. univercity.example."
  type        = string
}

variable "create_zone" {
  description = "True if Route53 should create the zone; false if it already exists."
  type        = bool
  default     = true
}

variable "site_domain" {
  description = "Fully-qualified domain the site is served on, e.g. app.univercity.example."
  type        = string
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name for the built assets."
  type        = string
}

variable "price_class" {
  type    = string
  default = "PriceClass_100"
}
