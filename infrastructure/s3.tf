# Set by environment variables, see .env.sample.
variable "aws_bucket_name" {}
variable "aws_region" {}

provider "aws" {
  alias = "us"
  region = "${var.aws_region}"
}

resource "aws_s3_bucket" "production" {
  provider = "aws.us"
  bucket = "${var.aws_bucket_name}"
  acl = "public-read"

  policy = <<S3_BUCKET_POLICY
{
  "Id": "Policy1454456986748",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1454456971813",
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:DeleteObject",
        "s3:DeleteObjectVersion",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectACL"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.aws_bucket_name}/*",
      "Principal": {
        "AWS": [
          "${aws_iam_user.deploy.arn}"
        ]
      }
    },
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "${aws_iam_user.deploy.arn}"
        ]
      },
      "Resource": "arn:aws:s3:::${var.aws_bucket_name}",
      "Action":["s3:ListBucket"]
    },
    {
      "Sid": "ReadAllAnonymous",
      "Effect": "Allow",
      "Principal": "*",
      "Resource": "arn:aws:s3:::${var.aws_bucket_name}/*",
      "Action":["s3:GetObject"]
    }
  ]
}
S3_BUCKET_POLICY

  website = {
    index_document = "index.html"
  }
}
