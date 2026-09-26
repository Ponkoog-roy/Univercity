variable "region" {
  type    = string
  default = "us-east-1"
}

variable "root_domain" {
  description = "Must match production/static-site's root_domain — same zone, looked up not created."
  type        = string
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.small"]
}

variable "use_spot" {
  type    = bool
  default = false
}

variable "desired_size" {
  type    = number
  default = 2
}
