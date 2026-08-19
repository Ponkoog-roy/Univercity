# Use manually installed Helm
$helm = "C:\helm\windows-amd64\helm.exe"

if (-not (Test-Path $helm)) {
    throw "Helm not found at $helm"
}

Write-Host "Using Helm: $helm" -ForegroundColor Green

& $helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

& $helm repo update

& $helm upgrade --install monitoring `
    prometheus-community/kube-prometheus-stack `
    --namespace monitoring `
    --create-namespace `
    --values "$PSScriptRoot\..\monitoring\values.yaml"

Write-Host ""
Write-Host "Monitoring stack installation completed." -ForegroundColor Green

kubectl get pods -n monitorings