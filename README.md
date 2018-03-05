# [Ember API Docs](https://emberjs.com/api/) [![Build Status](https://travis-ci.org/ember-learn/ember-api-docs.svg?branch=master)](https://travis-ci.org/ember-learn/ember-api-docs)

This project contains only the [API docs](https://emberjs.com/api) portion of [Emberjs.com](https://emberjs.com/). If you're looking for the rest of the site,
see the [website](https://github.com/emberjs/website)
and [guides](https://github.com/emberjs/guides) repositories.

There are four pieces that together create the Ember API docs:
- The app in this repository, which fetches and displays the API docs data. It is what you see at 
[https://emberjs.com/api](https://emberjs.com/api)
- The YUIdoc code comments found in the 
[Ember.js codebase](https://github.com/ember.js), where the informational content of the API documentation can be edited
- The data generator that serializes code comments into JSONAPI and
deploys the result,
[ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs)
- [ember-styleguide](https://github.com/ember-learn/ember-styleguide),
a component and styling library shared across apps.

## Contributing

New contributors are welcome! This project is is maintained by an all-volunteer team, 
and we are thankful for your help.

The best way to get started is to find issue labeled "good first issue" or "help wanted." If you have questions or want a buddy to pair with, drop by the #-team-learning channel on the 
[Ember Community Slack](https://ember-community-slackin.herokuapp.com/).
Like most open source projects, contributors are encouraged to open an issue
to propose changes and iterate on ideas before investing time in coding.
Some tips for working with git/GitHub can be found in
[Making your first pull request](https://github.com/emberjs/guides/blob/master/CONTRIBUTING.md#making-your-first-pull-request) in the Guides respository.

Please also see [CONTRIBUTING.md](CONTRIBUTING.md).

## Quickstart to run semi-locally

Follow these instructions to run the app using publically available online data.
You do not need to run [ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs) 
locally yourself.

```
git clone https://github.com/ember-learn/ember-api-docs.git
yarn install
bower install
ember serve
```
View at http://localhost:4200

## a11y testing

To run a11y tests, run `test_a11y=yes ember serve`

## Staging Environment
Latest changes from master can be seen on https://ember-api-docs-frontend-staging.global.ssl.fastly.net/
