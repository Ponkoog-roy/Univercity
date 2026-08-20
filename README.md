Univercity

Modern React application with GitOps-based Kubernetes deployment, ArgoCD continuous delivery, and Prometheus/Grafana monitoring.

Local Development

Clone the repository and start developing locally.

# Clone the repository
git clone <YOUR_GIT_URL>

# Enter the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
pnpm install

# Start development server
pnpm dev


Any commits pushed to GitHub will be automatically detected and synchronized by ArgoCD.

Docker Desktop Kubernetes Setup
Prerequisites

Install:

Docker Desktop (Kubernetes Enabled)
kubectl
Helm
Node.js
pnpm

Verify tools:

kubectl version --client
helm version
docker version
pnpm --version

Bootstrap the Cluster

Navigate to the scripts folder:

cd scripts

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.\bootstrap-cluster.ps1

Configure Metrics Server

Edit the Metrics Server deployment:

kubectl edit deployment metrics-server -n kube-system


Add the following argument:

- --kubelet-insecure-tls


Restart Metrics Server:

kubectl rollout restart deployment metrics-server -n kube-system


Verify:

kubectl top nodes
kubectl top pods -A

Monitoring Stack

Install the monitoring stack (Prometheus + Grafana + Alertmanager):

helm upgrade --install monitoring `
prometheus-community/kube-prometheus-stack `
-n monitoring `
--create-namespace `
-f .\monitoring\values.yaml


Verify:

kubectl get pods -n monitoring


Expected components:

Prometheus
Grafana
Alertmanager
kube-state-metrics
Node Exporter
Prometheus Operator
Access Grafana

Get the admin password:

kubectl get secret monitoring-grafana `
-n monitoring `
-o jsonpath="{.data.admin-password}"


Decode the password:

[System.Text.Encoding]::UTF8.GetString(
    [System.Convert]::FromBase64String(
        (kubectl get secret monitoring-grafana -n monitoring -o jsonpath="{.data.admin-password}")
    )
)


Port-forward Grafana:

kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80


Open:

http://localhost:3000


Default username:

admin

Access Prometheus
kubectl port-forward svc/monitoring-kube-prometheus-prometheus `
-n monitoring `
9090:9090


Open:

http://localhost:9090

ArgoCD Installation

Create namespace:

kubectl create namespace argocd


Add Helm repository:

helm repo add argo https://argoproj.github.io/argo-helm
helm repo update


Install ArgoCD:

helm install argocd argo/argo-cd `
  --namespace argocd `
  --set configs.params."server\.insecure"=true


Verify:

kubectl get pods -n argocd

Access ArgoCD

Port-forward:

kubectl port-forward svc/argocd-server -n argocd 8080:80


Open:

http://localhost:8080


Retrieve the initial admin password:

[System.Text.Encoding]::UTF8.GetString(
  [System.Convert]::FromBase64String(
    (kubectl get secret argocd-initial-admin-secret `
      -n argocd `
      -o jsonpath="{.data.password}")
  )
)


Username:

admin

Deployment Workflow

GitOps workflow:

GitHub
   │
   ▼
ArgoCD
   │
   ▼
Kubernetes
   │
   ├── Deployment
   ├── Service
   ├── Ingress
   ├── HPA
   └── Monitoring


Apply the application:

kubectl apply -f .\argocd\univercity-app.yaml


Check status:

kubectl get application -n argocd


Expected:

NAME         SYNC STATUS   HEALTH STATUS
univercity   Synced        Healthy

Autoscaling

Verify HPA:

kubectl get hpa -n univercity


Current configuration:

Min Replicas: 3
Max Replicas: 6


Monitor scaling activity:

kubectl get pods -n univercity -w

Internationalization (i18n)

This project uses:

i18next
react-i18next
i18next-http-backend
i18next-browser-languagedetector
Configuration
i18n.config.json
public/locales/
src/i18n/

Using Translations
import { useTranslation } from "react-i18next";

const Title = () => {
  const { t } = useTranslation();

  return <h1>{t("home.hero.title")}</h1>;
};

Change Language
const { i18n } = useTranslation();

await i18n.changeLanguage("zh-CN");

Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
Platform
Docker Desktop
Kubernetes
Ingress NGINX
ArgoCD
Observability
Prometheus
Grafana
Alertmanager
kube-state-metrics
Node Exporter
DevOps
GitHub
Helm
GitOps
Horizontal Pod Autoscaler (HPA)
Architecture
GitHub
   │
   ▼
ArgoCD
   │
   ▼
Kubernetes
   │
   ├── Ingress NGINX
   ├── Univercity Frontend
   ├── Service
   ├── HPA (3-6)
   └── Monitoring Stack
       ├── Prometheus
       ├── Grafana
       ├── Alertmanager
       └── Node Exporter

Deployment

Push your code:

git add .
git commit -m "feature update"
git push origin kube
