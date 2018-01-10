# [Ember API Docs](https://emberjs.com/api/) [![Build Status](https://travis-ci.org/ember-learn/ember-api-docs.svg?branch=master)](https://travis-ci.org/ember-learn/ember-api-docs)

This project is the versioned API documentation viewer built with Emberjs used at [Ember api docs](https://emberjs.com/api).
To view the data generator producing its data, please visit https://github.com/ember-learn/ember-jsonapi-docs

## Want to help out?

We'd love to get help working on the [next set of issues we're seeing](https://github.com/ember-learn/ember-api-docs/projects/2).

If you're a new contributor, come say hi in the Ember Community Slack's
team-learning channel, and look for the tags ["Good for New Contributors"
and "Help Wanted"](https://github.com/ember-learn/ember-api-docs/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+for+New+Contributors%22+label%3A%22help+wanted%22)
on our Issues.

Please also see [CONTRIBUTING.md](CONTRIBUTING.md).

## Quickstart to run locally

```
git clone https://github.com/ember-learn/ember-api-docs.git
yarn install
bower install
ember serve
```
View at http://localhost:4200

## Project Overview

Ember itself is documented using a tool called [YUIDoc](http://yui.github.io/yuidoc/).
YUIDoc creates structured API doc data, which is turned into JSONAPI by a generator, [ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs).
That data is filtered and displayed by this Ember app, [ember-api-docs](https://github.com/ember-learn/ember-api-docs).

This project contains only the [API docs](https://emberjs.com/api) portion of [Emberjs.com](https://emberjs.com/). If you're looking for the rest of the site,
see the [website](https://github.com/emberjs/website)
and [guides](https://github.com/emberjs/guides) repositories.

## a11y testing

To run a11y tests, run `test_a11y=yes ember serve`

## Staging Environment
Latest changes from master can be seen on https://ember-api-docs-frontend-staging.global.ssl.fastly.net/
