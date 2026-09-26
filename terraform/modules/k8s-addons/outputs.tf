output "grafana_admin_secret_name" {
  value       = kubernetes_secret.grafana_admin.metadata[0].name
  description = "kubectl get secret <this> -n monitoring -o jsonpath='{.data.admin-password}' | base64 -d"
}

output "argocd_namespace" {
  value = kubernetes_namespace.argocd.metadata[0].name
}
