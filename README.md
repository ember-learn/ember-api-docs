[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/ember-api-docs/workflows/CI/badge.svg)](https://github.com/ember-learn/ember-api-docs/actions?query=workflow%3ACI)
[![This project uses Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Ember/ember-api-docs)

# [Ember API Docs](https://api.emberjs.com/)

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
npm install
ember serve
```
View at http://localhost:4200

## Run fully-locally using `ember-api-docs-data`

The Prembered version of the ember-api-docs expects a folder in its root that links to the `ember-api-docs-data` folder, so all you need to do is create a symbolic link to ember-api-docs-data and you can see the app running locally.

Clone all of the following repositories into the same directory so they are "siblings" on the file system

- This repository, `ember-api-docs`
- [ember-data](https://github.com/emberjs/data/)

```sh
git clone https://github.com/ember-learn/ember-api-docs-data
cd ../ember-api-docs-data
npm install
cd ..
git clone https://github.com/ember-learn/ember-api-docs
cd ember-api-docs
ln -s ../ember-api-docs-data # assuming it's checked out in the same folder
npm install
npm start
```

Visit the app in your browser at [http://localhost:4200](http://localhost:4200)

## a11y testing

To run a11y tests, run `test_a11y=yes ember serve`

## Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Staging and Deployment

See the [DEPLOYING.md](https://github.com/ember-learn/ember-api-docs/blob/master/DEPLOYING.md) guide for instructions.

## Building

Cross-browser testing provided by:

<a href="http://browserstack.com" target="browserstack"><img height="70" src="/public/assets/images/browserstack-logo.png" alt="BrowserStack"></a>
