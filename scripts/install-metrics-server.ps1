kubectl get deployment metrics-server -n kube-system 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing Metrics Server..."

    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

    kubectl patch deployment metrics-server `
      -n kube-system `
      --type=json `
      -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
}
else {
    Write-Host "Metrics Server already installed."
}