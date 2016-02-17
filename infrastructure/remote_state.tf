# Expected to be environment variables.
variable "terraform_state_bucket" {}
variable "terraform_state_key" {}
variable "terraform_state_region" {}

resource "terraform_remote_state" "production" {
  backend = "s3"

  config {
    bucket = "${aws_s3_bucket.terraform_state_production.bucket}"
    key = "${var.terraform_state_key}"
    region = "${var.terraform_state_region}"
    acl = "private"
  }
}

resource "aws_s3_bucket" "terraform_state_production" {
  provider = "aws.us"
  bucket = "${var.terraform_state_bucket}"
  acl = "private"
}
