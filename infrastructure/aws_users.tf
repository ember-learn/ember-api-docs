
resource "aws_iam_user" "deploy" {
  name = "travis_ci"
}

resource "aws_iam_access_key" "deploy" {
  user = "${aws_iam_user.deploy.name}"
}

