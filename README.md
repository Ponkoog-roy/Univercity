 ✅ GitOps with ArgoCD
 ✅ Monitoring with Prometheus/Grafana/Alertmanager
 ✅ CI/CD with GitHub Actions
 ✅ Semantic Versioning
 ✅ HPA
 ✅ App-of-Apps architecture

New README Structure
# Univercity

Modern React application deployed on Kubernetes using GitOps practices with ArgoCD, automated CI/CD, autoscaling, and full observability through Prometheus and Grafana.

---

## Platform Features

- React + TypeScript + Vite
- Dockerized application
- Kubernetes deployment
- ArgoCD GitOps delivery
- GitHub Actions CI/CD
- Semantic Versioning
- NGINX Ingress
- Horizontal Pod Autoscaler (HPA)
- Prometheus Monitoring
- Grafana Dashboards
- Alertmanager Alerting

---

## Architecture

```text
Developer
    │
    ▼
   main
    │
    ▼
GitHub Actions
    │
    ├── Test
    ├── Build
    ├── Push Docker Image
    └── Update kube Branch
                 │
                 ▼
                kube
                 │
                 ▼
               ArgoCD
                 │
                 ▼
            Kubernetes
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
   Ingress      HPA     Monitoring
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
         Prometheus          Grafana

Branch Strategy
main

Application source code.

main
├── src/
├── public/
├── Dockerfile
├── package.json
└── VERSION

kube

GitOps deployment manifests.

kube
├── k8s/
├── argocd/
└── monitoring/


ArgoCD continuously watches the kube branch.

Local Development

Clone the repository:

git clone https://github.com/Ponkoog-roy/Univercity.git

cd Univercity


Install dependencies:

pnpm install


Run locally:

pnpm dev


Create a production build:

pnpm build:prod

Docker

Build image locally:

docker build -t ponkoog/univercity:v1.0.0 .


Run locally:

docker run -p 8085:80 ponkoog/univercity:v1.0.0


Open:

http://localhost:8085

Kubernetes Setup

Bootstrap the cluster:

cd scripts

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.\bootstrap-cluster.ps1

Metrics Server

Edit Metrics Server:

kubectl edit deployment metrics-server -n kube-system


Add:

- --kubelet-insecure-tls


Restart:

kubectl rollout restart deployment metrics-server -n kube-system


Verify:

kubectl top nodes
kubectl top pods -A

ArgoCD

Install:

kubectl create namespace argocd

helm repo add argo https://argoproj.github.io/argo-helm

helm repo update

helm install argocd argo/argo-cd `
  --namespace argocd `
  --set configs.params."server\.insecure"=true


Access:

kubectl port-forward svc/argocd-server -n argocd 8080:80

http://localhost:8080

Monitoring Stack

Install:

helm upgrade --install monitoring `
prometheus-community/kube-prometheus-stack `
-n monitoring `
--create-namespace `
-f .\monitoring\values.yaml


Components:

Prometheus
Grafana
Alertmanager
kube-state-metrics
Prometheus Operator
Node Exporter
Grafana

Access:

kubectl port-forward svc/monitoring-grafana `
-n monitoring `
3000:80

http://localhost:3000


Default username:

admin

Prometheus

Access:

kubectl port-forward svc/monitoring-kube-prometheus-prometheus `
-n monitoring `
9090:9090

http://localhost:9090

Alerting

Configured alerts:

FrontendDown
FrontendHighCPU
FrontendHighMemory
PodRestarting

Alert rules managed through PrometheusRule resources.

Autoscaling

Verify HPA:

kubectl get hpa -n univercity


Configuration:

Min Replicas: 3
Max Replicas: 6


Watch scaling:

kubectl get pods -n univercity -w

CI/CD Pipeline

Workflow:

Push to main
      │
      ▼
GitHub Actions
      │
      ├── Test
      ├── Build
      ├── Push Docker Image
      └── Update kube Branch
                   │
                   ▼
                 ArgoCD
                   │
                   ▼
              Kubernetes

Semantic Versioning

Version format:

MAJOR.MINOR.PATCH


Examples:

v1.0.0
v1.0.1
v1.0.2


Version is tracked through:

VERSION

Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
Platform
Docker
Kubernetes
NGINX Ingress
ArgoCD
Observability
Prometheus
Grafana
Alertmanager
kube-state-metrics
Node Exporter
DevOps
GitHub Actions
Docker Hub
GitOps
Helm
HPA
Deployment Flow
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Actions
    │
    ▼
Docker Hub
    │
    ▼
kube Branch
    │
    ▼
ArgoCD
    │
    ▼
Kubernetes
    │
    ▼
Monitoring & Alerting

Repository Status

✅ GitOps
 ✅ CI/CD
 ✅ Kubernetes
 ✅ ArgoCD
 ✅ HPA
 ✅ Monitoring
 ✅ Grafana Dashboards
 ✅ Prometheus Alerts
 ✅ Semantic Versioning

