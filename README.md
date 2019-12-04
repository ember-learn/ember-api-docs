# [Ember API Docs](https://api.emberjs.com/) [![Build Status](https://travis-ci.org/ember-learn/ember-api-docs.svg?branch=master)](https://travis-ci.org/ember-learn/ember-api-docs)

This project contains only the [API docs](https://api.emberjs.com/) portion of [Emberjs.com](https://emberjs.com/). If you're looking for the rest of the site,
see the [website](https://github.com/ember-learn/ember-website)
and [guides](https://github.com/ember-learn/guides-source) repositories.

There are many pieces that together create the Ember API docs site:
- The app in this repository, which fetches and displays the API docs data. It is what you see at
[https://api.emberjs.com/](https://api.emberjs.com/)
- The YUIdoc code comments found in the
[Ember.js codebase](https://github.com/emberjs/ember.js), where the informational content of the API documentation can be edited
- The data generator that serializes code comments into JSONAPI and
deploys the result,
[ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs)
- [ember-styleguide](https://github.com/ember-learn/ember-styleguide),
a component and styling library shared across apps.
- [algolia-index-update-scripts](https://github.com/ember-learn/algolia-index-update-scripts) for managing the search feature of the api docs site

## Contributing

New contributors are welcome! This project is maintained by an all-volunteer team,
and we are thankful for your help.

The best way to get started is to find an issue labeled "good first issue" or "help wanted." If you have questions or want a buddy to pair with, drop by the #dev-ember-learning channel on the
[Ember Community Discord](https://discordapp.com/invite/emberjs).
Like most open-source projects, contributors are encouraged to open an issue
to propose changes and iterate on ideas before investing time in coding.
Some tips for working with git/GitHub can be found in
[Making your first pull request](https://github.com/emberjs/guides/blob/master/CONTRIBUTING.md#making-your-first-pull-request) in the Guides repository.

Please also see [CONTRIBUTING.md](CONTRIBUTING.md).

## Quickstart to run semi-locally

Follow these instructions to run the app using publically available online data.
You do not need to run [ember-jsonapi-docs](https://github.com/ember-learn/ember-jsonapi-docs)
locally yourself.

```
git clone https://github.com/ember-learn/ember-api-docs.git
cd ember-api-docs
yarn install
ember serve
```
View at http://localhost:4200

## a11y testing

To run a11y tests, run `test_a11y=yes ember serve`

## Staging Environment
Latest changes from master can be seen on https://ember-api-docs-frontend-staging.global.ssl.fastly.net/

### Linting

* `yarn run lint:hbs`
* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Building

Cross-browser testing provided by:

<a href="http://browserstack.com" target="browserstack"><img height="70" src="/public/assets/images/browserstack-logo.png" alt="BrowserStack"></a>
