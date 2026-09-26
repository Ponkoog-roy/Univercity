output "cluster_name" {
  value = module.eks.cluster_name
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}

output "grafana_admin_secret_name" {
  value       = module.k8s_addons.grafana_admin_secret_name
  description = "Retrieve with: kubectl get secret <this> -n monitoring -o jsonpath='{.data.admin-password}' | base64 -d"
}

output "kubeconfig_command" {
  value = "aws eks update-kubeconfig --name ${module.eks.cluster_name} --region ${var.region}"
}
