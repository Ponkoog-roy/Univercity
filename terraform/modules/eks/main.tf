# WHY: this is the centerpiece of the portfolio track — a real EKS cluster
# with IRSA wired up so the AWS Load Balancer Controller and any future
# workload can assume IAM roles without static credentials, which is the
# thing interviewers actually check for when a candidate says "I've used
# EKS in production."
#
# WHAT: an EKS control plane, an OIDC provider for IRSA, one managed node
# group sized to be cheap (default: 2x t3.small, on-demand — see variables
# for a spot-instance toggle), and the cluster/node IAM roles EKS requires.
#
# DEPENDENCIES: modules/vpc (needs private_subnet_ids for nodes and
# public+private for the control plane's ENIs).
#
# VERIFICATION: `aws eks update-kubeconfig --name <cluster_name>` then
# `kubectl get nodes` should show 2 Ready nodes; `aws eks describe-cluster
# --query cluster.identity.oidc.issuer` should return a URL matching this
# module's oidc_provider_url output.

data "aws_caller_identity" "current" {}

resource "aws_iam_role" "cluster" {
  name = "${var.name}-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "cluster_policy" {
  role       = aws_iam_role.cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_eks_cluster" "this" {
  name     = var.name
  role_arn = aws_iam_role.cluster.arn
  version  = var.kubernetes_version

  vpc_config {
    subnet_ids              = concat(var.private_subnet_ids, var.public_subnet_ids)
    endpoint_private_access  = true
    endpoint_public_access   = true # demo convenience; tighten to false + a bastion/VPN for a real prod cluster
  }

  tags = var.tags

  depends_on = [aws_iam_role_policy_attachment.cluster_policy]
}

# --- IRSA: lets pods assume IAM roles via a Kubernetes service account,
# instead of node-wide IAM roles or static keys. Required by the AWS Load
# Balancer Controller and by kube-prometheus-stack if it ever needs AWS API
# access (e.g. for Managed Prometheus remote-write).
data "tls_certificate" "eks" {
  url = aws_eks_cluster.this.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "eks" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.eks.certificates[0].sha1_fingerprint]
  url             = aws_eks_cluster.this.identity[0].oidc[0].issuer
}

resource "aws_iam_role" "nodes" {
  name = "${var.name}-eks-node-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "node_worker" {
  role       = aws_iam_role.nodes.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "node_cni" {
  role       = aws_iam_role.nodes.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "node_ecr" {
  role       = aws_iam_role.nodes.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_eks_node_group" "default" {
  cluster_name    = aws_eks_cluster.this.name
  node_group_name = "${var.name}-default"
  node_role_arn   = aws_iam_role.nodes.arn
  subnet_ids      = var.private_subnet_ids

  instance_types = var.node_instance_types
  capacity_type  = var.use_spot ? "SPOT" : "ON_DEMAND"

  scaling_config {
    desired_size = var.desired_size
    min_size     = var.min_size
    max_size     = var.max_size
  }

  update_config {
    max_unavailable = 1
  }

  tags = var.tags

  depends_on = [
    aws_iam_role_policy_attachment.node_worker,
    aws_iam_role_policy_attachment.node_cni,
    aws_iam_role_policy_attachment.node_ecr,
  ]
}
