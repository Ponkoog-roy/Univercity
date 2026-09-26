# WHY: these four add-ons are what turn a bare EKS cluster into the
# "-> ALB -> Prometheus -> Grafana -> HPA" parts of the portfolio
# architecture. Installing them via the Terraform helm/kubernetes
# providers (rather than a separate manual `helm install` step) keeps the
# whole stack in one `terraform apply` and one state file.
#
# WHAT:
#  - IRSA role + the AWS Load Balancer Controller (makes k8s Ingress
#    resources provision real ALBs)
#  - metrics-server (required for HPA to have CPU/memory data to scale on)
#  - ArgoCD (GitOps controller — this module installs it; wiring an actual
#    Application resource to sync this repo's /k8s manifests is a kubectl-
#    apply step after this module, using the same argocd/*.yaml already in
#    the repo, since an ArgoCD Application is app config, not cluster infra)
#  - kube-prometheus-stack (Prometheus + Grafana + Alertmanager), with the
#    Phase 1 finding fixed: Grafana's admin password is now a random value
#    in a Kubernetes Secret, never a plaintext value in a values file.
#
# DEPENDENCIES: modules/eks (cluster + OIDC provider) and a configured
# kubernetes/helm provider pointed at that cluster (see environments/
# portfolio/eks-demo/main.tf).
#
# VERIFICATION: `kubectl get pods -n kube-system | grep aws-load-balancer`
# and `-n argocd` / `-n monitoring` should show Running pods; `kubectl get
# secret grafana-admin -n monitoring -o jsonpath='{.data.admin-password}'
# | base64 -d` retrieves the generated password (never committed anywhere).

resource "aws_iam_role" "alb_controller" {
  name = "${var.cluster_name}-alb-controller"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = var.oidc_provider_arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "${var.oidc_provider_url}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
          "${var.oidc_provider_url}:aud" = "sts.amazonaws.com"
        }
      }
    }]
  })
}

# NOTE: this is a condensed version of the official policy published at
# https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json
# Verify against that URL before applying — the upstream project updates
# this policy periodically as it adds features.
resource "aws_iam_role_policy" "alb_controller" {
  name = "${var.cluster_name}-alb-controller-policy"
  role = aws_iam_role.alb_controller.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:DescribeAccountAttributes", "ec2:DescribeAddresses", "ec2:DescribeAvailabilityZones",
          "ec2:DescribeInternetGateways", "ec2:DescribeVpcs", "ec2:DescribeSubnets",
          "ec2:DescribeSecurityGroups", "ec2:DescribeInstances", "ec2:DescribeNetworkInterfaces",
          "ec2:DescribeTags", "ec2:GetCoipPoolUsage", "ec2:DescribeCoipPools",
          "elasticloadbalancing:Describe*",
          "acm:ListCertificates", "acm:DescribeCertificate",
          "iam:ListServerCertificates", "iam:GetServerCertificate",
          "waf-regional:GetWebACL", "wafv2:GetWebACL", "wafv2:GetWebACLForResource",
          "shield:GetSubscriptionState", "shield:DescribeProtection"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ec2:AuthorizeSecurityGroupIngress", "ec2:RevokeSecurityGroupIngress",
          "ec2:CreateSecurityGroup", "ec2:CreateTags", "ec2:DeleteTags"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "elasticloadbalancing:CreateLoadBalancer", "elasticloadbalancing:CreateTargetGroup",
          "elasticloadbalancing:CreateListener", "elasticloadbalancing:DeleteListener",
          "elasticloadbalancing:CreateRule", "elasticloadbalancing:DeleteRule",
          "elasticloadbalancing:AddTags", "elasticloadbalancing:RemoveTags",
          "elasticloadbalancing:ModifyLoadBalancerAttributes", "elasticloadbalancing:SetIpAddressType",
          "elasticloadbalancing:SetSecurityGroups", "elasticloadbalancing:SetSubnets",
          "elasticloadbalancing:DeleteLoadBalancer", "elasticloadbalancing:ModifyTargetGroup",
          "elasticloadbalancing:ModifyTargetGroupAttributes", "elasticloadbalancing:DeleteTargetGroup",
          "elasticloadbalancing:RegisterTargets", "elasticloadbalancing:DeregisterTargets",
          "elasticloadbalancing:SetWebAcl", "elasticloadbalancing:ModifyListener",
          "elasticloadbalancing:AddListenerCertificates", "elasticloadbalancing:RemoveListenerCertificates",
          "elasticloadbalancing:ModifyRule"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "helm_release" "aws_load_balancer_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.8.1"

  set {
    name  = "clusterName"
    value = var.cluster_name
  }
  set {
    name  = "serviceAccount.create"
    value = "true"
  }
  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }
  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = aws_iam_role.alb_controller.arn
  }
}

resource "helm_release" "metrics_server" {
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server/"
  chart      = "metrics-server"
  namespace  = "kube-system"
  version    = "3.12.1"
}

resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
  }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = kubernetes_namespace.argocd.metadata[0].name
  version    = "7.6.12"

  # Server stays ClusterIP here: exposing it is a deliberate follow-up step
  # (port-forward for demos, or an Ingress + real auth/TLS if it needs to
  # stay up) rather than the plaintext-HTTP ingress flagged in Phase 1.
  set {
    name  = "server.service.type"
    value = "ClusterIP"
  }
}

resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

resource "random_password" "grafana_admin" {
  length  = 20
  special = true
}

resource "kubernetes_secret" "grafana_admin" {
  metadata {
    name      = "grafana-admin"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }

  data = {
    admin-user     = "admin"
    admin-password = random_password.grafana_admin.result
  }
}

resource "helm_release" "kube_prometheus_stack" {
  name       = "monitoring"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  version    = "65.5.1"

  values = [yamlencode({
    grafana = {
      admin = {
        existingSecret = kubernetes_secret.grafana_admin.metadata[0].name
        userKey        = "admin-user"
        passwordKey    = "admin-password"
      }
    }
    prometheus = {
      prometheusSpec = {
        retention = var.prometheus_retention
      }
    }
    alertmanager = {
      enabled = true
    }
  })]
}
