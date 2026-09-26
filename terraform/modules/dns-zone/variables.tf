variable "domain_name" {
  description = "Root domain, e.g. univercity.example."
  type        = string
}

variable "create_zone" {
  description = "True to create a new hosted zone; false to look up an existing one by name."
  type        = bool
  default     = true
}

variable "tags" {
  type    = map(string)
  default = {}
}
