## Deployment Playbook

This playbook is not intended as a complete set of instructions, but rather pointers and reminders for maintainers, plus emergency maintenance.

### Deploying to staging/test environment

Auto-generated deployments associated with Pull Requests typically do not work as expected
due to unusual environmental configurations. To see an app in staging, they must be deployed
from the [Heroku console](https://dashboard.heroku.com/teams/ember/overview) instead.

1. Visit [the ember team org](https://dashboard.heroku.com/teams/ember/overview) in the Heroku
console.
2. Select the "Apps" tab and then ember-api-docs
3. From the "Staging" column, click the arrows next to the instance name, choose "Deploy a
branch," and select the branch you wish to deploy to staging.
4. When deployment is complete, click the arrows next to the instance again and choose
"Open app in browser"

### Deploying to production

First, deploy the `master` branch to staging following the steps above, and check it over thoroughly. Get a second person to look it over too. There are many variables that could affect how an app displays in production compared to locally, particularly for this app.

Never click the "promote to production" button on Heroku. We shouldn't promote from staging with this button because Heroku uses the same build from staging in the production container. This would mean that the variables set during ember builds get reused. Some of these variables have different values between staging and production, which leads to issues.

To deploy properly to production, click on the arrows for the `ember-api-docs` instance under Production,
choose "Deploy a branch" and choose the branch name.

### Rolling back to an earlier version

Never "revert a merge" on GitHub. Never click the "promote to production" button on Heroku.

From within the Heroku console, click on the instance name, i.e. ember-api-docs-staging, 
choose the "Activity" tab, and choose "Roll back to here."

### About the API docs stack

This app is the final piece of the api docs stack. The stack begins with
documentation blocks in the ember.js source code. When new versions of
Ember are released, a worker intakes the documentation from S3 and turns it into
jsonapi, [ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs).
The resulting docs are fetched and consumed by this app.
