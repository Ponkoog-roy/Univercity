variable "name" {
  type        = string
  description = "Prefix for all resource Name tags."
}

variable "vpc_cidr" {
  type    = string
  default = "10.20.0.0/16"
}

variable "tags" {
  type    = map(string)
  default = {}
}
