# Expected to be defined as an environment variable
variable heroku_production_app_name {}
variable heroku_staging_app_name {}

resource "heroku_app" "production" {
  name = "${var.heroku_production_app_name}"
  region = "us"

  config_vars {
    AWS_ACCESS_KEY_ID = "${aws_iam_access_key.deploy.id}"
    AWS_SECRET_ACCESS_KEY = "${aws_iam_access_key.deploy.secret}"
    AWS_BUCKET_NAME = "${aws_s3_bucket.production.bucket}"
    AWS_BUCKET_REGION = "${var.aws_region}"

    HEROKU_EMBER_CLI_DEPLOY = "true"
  }
}

resource "heroku_app" "staging" {
  name = "${var.heroku_staging_app_name}"
  region = "us"

  config_vars {
    AWS_ACCESS_KEY_ID = "${aws_iam_access_key.deploy.id}"
    AWS_SECRET_ACCESS_KEY = "${aws_iam_access_key.deploy.secret}"
    AWS_BUCKET_NAME = "${aws_s3_bucket.production.bucket}"
    AWS_BUCKET_REGION = "${var.aws_region}"

    HEROKU_EMBER_CLI_DEPLOY = "true"
  }
}
