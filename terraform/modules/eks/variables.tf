variable "name" {
  type        = string
  description = "Cluster name, also used to prefix IAM role names."
}

variable "kubernetes_version" {
  type    = string
  default = "1.30"
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "public_subnet_ids" {
  type = list(string)
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.small"]
}

variable "use_spot" {
  description = "Spot instances cut node cost ~60-70% and are appropriate for a demo cluster with no availability SLA. Not recommended if you need the cluster reliably up during a live interview/demo — spot can be reclaimed with 2 minutes' notice."
  type        = bool
  default     = false
}

variable "desired_size" {
  type    = number
  default = 2
}

variable "min_size" {
  type    = number
  default = 1
}

variable "max_size" {
  type    = number
  default = 3
}

variable "tags" {
  type    = map(string)
  default = {}
}
