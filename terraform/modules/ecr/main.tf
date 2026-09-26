# WHY: the existing GitHub Actions workflow pushes to Docker Hub (public,
# unscanned). Moving the portfolio track's images to a private ECR repo
# with scan-on-push is one of the concrete gaps identified in the Phase 1
# security review, and it's what the "-> ECR ->" step in the portfolio
# architecture refers to.
#
# WHAT: one private ECR repository with image scanning on push and a
# lifecycle policy that keeps the CI/CD pipeline from accumulating
# unlimited untagged images.
#
# DEPENDENCIES: none.
#
# VERIFICATION: `aws ecr describe-repositories` shows imageScanningConfiguration.scanOnPush
# = true; after pushing an image, `aws ecr describe-image-scan-findings`
# returns results rather than an error.

resource "aws_ecr_repository" "this" {
  name                 = var.name
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = var.tags
}

resource "aws_ecr_lifecycle_policy" "this" {
  repository = aws_ecr_repository.this.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Expire untagged images after 7 days"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 7
        }
        action = { type = "expire" }
      },
      {
        rulePriority = 2
        description  = "Keep only the last 15 tagged images"
        selection = {
          tagStatus   = "tagged"
          tagPrefixList = ["v"]
          countType   = "imageCountMoreThan"
          countNumber = 15
        }
        action = { type = "expire" }
      }
    ]
  })
}
