kubectl get namespace ingress-nginx 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing NGINX Ingress..."

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
}
else {
    Write-Host "NGINX Ingress already installed."
}