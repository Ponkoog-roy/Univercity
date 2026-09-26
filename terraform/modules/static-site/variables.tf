variable "name" {
  description = "Short name used to prefix WAF/CloudFront resource names."
  type        = string
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name for the built SPA assets."
  type        = string
}

variable "domain_name" {
  description = "Fully-qualified domain the site is served on, e.g. app.univercity.example."
  type        = string
}

variable "zone_id" {
  description = "Route53 hosted zone ID that domain_name belongs to."
  type        = string
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 covers North America + Europe only and is cheapest; use PriceClass_All if the audience is genuinely global."
  type        = string
  default     = "PriceClass_100"
}

variable "waf_rate_limit" {
  description = "Requests per 5-minute window per IP before WAF blocks it."
  type        = number
  default     = 2000
}

variable "tags" {
  description = "Tags applied to every taggable resource in this module."
  type        = map(string)
  default     = {}
}
