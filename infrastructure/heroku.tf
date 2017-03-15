# Expected to be defined as an environment variable
variable heroku_production_app_name {}

variable heroku_staging_app_name {}

resource "heroku_app" "production" {
  name   = "${var.heroku_production_app_name}"
  region = "us"

  organization = {
    name     = "ember-conf"
    locked   = true
    personal = false
  }

  config_vars {
    AWS_ACCESS_KEY    = "${aws_iam_access_key.deploy.id}"
    AWS_SECRET_KEY    = "${aws_iam_access_key.deploy.secret}"
    AWS_BUCKET_NAME   = "${aws_s3_bucket.production.bucket}"
    AWS_BUCKET_REGION = "${var.aws_region}"

    HEROKU_EMBER_CLI_DEPLOY = "true"
    WORKER_COUNT            = 1
  }
}

resource "heroku_addon" "fastly_staging" {
  app  = "${heroku_app.staging.name}"
  plan = "fastly:fast"
}

resource "heroku_addon" "fastly_production" {
  app  = "${heroku_app.production.name}"
  plan = "fastly:fast"
}

resource "heroku_app" "staging" {
  name   = "${var.heroku_staging_app_name}"
  region = "us"

  organization = {
    name     = "ember-conf"
    locked   = true
    personal = false
  }

  config_vars {
    AWS_ACCESS_KEY_ID = "${aws_iam_access_key.deploy.id}"
    AWS_SECRET_KEY    = "${aws_iam_access_key.deploy.secret}"
    AWS_BUCKET_NAME   = "${aws_s3_bucket.production.bucket}"
    AWS_BUCKET_REGION = "${var.aws_region}"

    HEROKU_EMBER_CLI_DEPLOY = "true"
    WORKER_COUNT            = 1
  }
}
