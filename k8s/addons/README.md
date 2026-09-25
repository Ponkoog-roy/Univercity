# Cluster addons — install order

Terraform's `modules/k8s-addons` should provision the IRSA IAM roles below and
either call these Helm releases directly (via the `helm` Terraform provider)
or emit `helm install` commands for ArgoCD to reconcile as `Application`
resources pointing at these charts. Raw YAML is provided only for
Cluster Autoscaler (`cluster-autoscaler.yaml`), since it's a single Deployment
with no useful chart abstraction here.

## 1. Metrics Server (required by HPA)
```bash
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm upgrade --install metrics-server metrics-server/metrics-server \
  -n kube-system \
  --set args={--kubelet-insecure-tls=false} \
  --set resources.requests.cpu=50m \
  --set resources.requests.memory=64Mi
```
Verification: `kubectl top pods -n univercity` returns non-zero CPU/memory.

## 2. AWS Load Balancer Controller (drives the Ingress → ALB)
Requires an IRSA role (`AmazonEKSLoadBalancerControllerRole`) with the
official AWS policy attached — create via the `eks` or `k8s-addons`
Terraform module, not by hand.
```bash
helm repo add eks https://aws.github.io/eks-charts
helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=REPLACE_CLUSTER_NAME \
  --set serviceAccount.create=true \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set serviceAccount.annotations."eks\.amazonaws\.com/role-arn"=REPLACE_IRSA_ROLE_ARN \
  --set region=REPLACE_AWS_REGION \
  --set vpcId=REPLACE_VPC_ID
```
Verification: `kubectl get ingress -n univercity` shows an `ADDRESS` (the ALB
DNS name) within ~2 minutes of applying `ingress.yaml`.

## 3. ExternalDNS (Ingress hostname → Route53 record)
IRSA role needs `route53:ChangeResourceRecordSets` scoped to the hosted zone
ID only (least privilege — not `route53:*`).
```bash
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
helm upgrade --install external-dns external-dns/external-dns \
  -n kube-system \
  --set provider=aws \
  --set aws.zoneType=public \
  --set domainFilters={example.com} \
  --set txtOwnerId=REPLACE_CLUSTER_NAME \
  --set serviceAccount.annotations."eks\.amazonaws\.com/role-arn"=REPLACE_IRSA_ROLE_ARN
```
Verification: after applying an Ingress, `dig <hostname>` resolves to the ALB.

## 4. kube-prometheus-stack (Prometheus + Grafana + Alertmanager)
See `../monitoring/values-kube-prometheus-stack.yaml` for the values file.
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  -n monitoring \
  -f ../monitoring/values-kube-prometheus-stack.yaml
```
Verification: `kubectl get pods -n monitoring` all Running; Grafana reachable
via `kubectl port-forward` shows the default dashboards populated.

## 5. Cluster Autoscaler
Apply `cluster-autoscaler.yaml` directly (IRSA role with
`autoscaling:DescribeAutoScalingGroups`, `autoscaling:SetDesiredCapacity`,
`autoscaling:TerminateInstanceInAutoScalingGroup`, `ec2:DescribeLaunchTemplateVersions`,
scoped by the `k8s.io/cluster-autoscaler/<cluster-name>` tag condition).
Verification: scale a Deployment past node capacity; `kubectl get nodes`
shows a new node join within ~3-5 minutes, and shrink back down after
`--scale-down-unneeded-time` (default 10m) once load drops.

## Order matters
metrics-server → cluster-autoscaler → aws-load-balancer-controller →
external-dns → kube-prometheus-stack → then apply `base/` + overlay via
ArgoCD. HPA and Ingress manifests will sit un-reconciled (but harmless) until
their respective controllers are live.
