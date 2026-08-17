$helm = "C:\helm\windows-amd64\helm.exe"

& $helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

& $helm repo update

& $helm upgrade --install monitoring `
  prometheus-community/kube-prometheus-stack `
  --namespace monitoring `
  --create-namespace `
  --values .\monitoring\values.yaml