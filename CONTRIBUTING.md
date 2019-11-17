# Questions

This is the issue tracker for [Ember.js API](https://api.emberjs.com/).

# Issue Labeling

We use [StandardIssueLabels](https://github.com/wagenet/StandardIssueLabels) for Github Issues.

# Issues

Think you've found a bug or have a new feature to suggest? Let us know!

## Reporting a Bug

1. Search for similar issues. It's possible somebody has encountered
this bug already.

2. Please make sure you provide very specific steps to reproduce the error.
If we cannot reproduce it, we will close the ticket. Screenshots or [recorded gifs](https://www.cockos.com/licecap/) of
the issue that you are experiencing will help towards reproducing and solving issues sooner.

4. Your issue will be verified. The provided example will be tested for
correctness. Our team will work with you until your issue can
be verified.

5. Keep up to date with feedback from our team on your ticket. Your
ticket may be closed if it becomes stale.

6. If possible, submit a Pull Request with a failing test. Better yet, take
a stab at fixing the bug yourself if you can!

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action.

### Triaging policy

* You might be requested to provide a reproduction or extra information. In that
case, the issue will be labeled as _Needs Submitter Response_. If we did not
get any response after seven days, we will ping you to remind you about it. We
might close the issue if we do not hear from you after two weeks since the
original notice.

* If you submit a feature request as an issue, you will be invited to follow the
[instructions in this document](#requesting-a-feature) and the issue will be closed.

* Issues that become inactive will be labeled accordingly
  to inform the original poster and our contributors that the issue
  should be closed since the issue is no longer actionable. The issue
  can be reopened at a later time if needed, e.g. becomes actionable again.

* If possible, issues will be labeled to indicate the status or priority.
  For example, labels may have a prefix for `Status: X`, or `Priority: X`.
  Statuses may include: `In Progress`, `On Hold`. Priorities may include:
  `High` or `Low`.

## Requesting a Feature

* Provide a clear and detailed explanation of the feature you want and why
it's important to add. Keep in mind that we want features that will be useful
to the majority of our users and not just a small subset.

* After discussing the feature you may choose to attempt a Pull Request. If
you're at all able, start writing some code. We always have more work to do
than time to do it. If you can write some code then that will speed the process
along.

If you have a question please reach out to us on the #dev-ember-learning channel on ember Discord

# Building Ember.js API Docs

```sh
clone the latest ember.js api docs from github
 - git clone https://github.com/ember-learn/ember-api-docs.git

cd to the cloned ember-api-docs directory
 - cd ember-api-docs

ensure Node.js and yarn are installed

follow these commands to build ember.js
 - yarn install
 - yarn run build
```

# Development steps

1. Follow the setup steps listed above under [Building Ember.js API](#building-emberjs-api-docs).

2. To start the development server, run `yarn start`.

3. To run all tests run `yarn test`

4. To run the app with fastboot cli like our server deployment run the following commands,
```
- ember deploy production
- ./bin/ember-fastboot tmp/deploy-dist
```


# Pull Requests

We love pull requests. Here's a quick guide:

1. Fork the repo.

2. Run the tests. We only take pull requests with passing tests, and it's great
to know that you have a clean slate: `yarn install && yarn test`.

3. Add a test for your change. Only refactoring and documentation changes
require no new tests. If you are adding functionality or fixing a bug, we need
a test!

4. Make the test pass.

5. Commit your changes. If your pull request fixes an issue specify it in the commit message.

6. Push to your fork and submit a pull request. Please provide us with some
explanation of why you made the changes you made. For new features make sure to
explain a standard use case to us.

We try to be quick about responding to tickets but sometimes we get a bit
backlogged. If the response is slow, try to find someone on Discord (#dev-ember-learning) to
give the ticket a review.

Including tests that fail without your code, and making it pass will increase the chance
that your pull request is accepted.

And in case we didn't emphasize it enough: we love tests!


# Travis CI Tests

We use [Travis CI](https://travis-ci.org/ember-learn/ember-api-docs/pull_requests) to test each PR before it is merged.

When you submit your PR (or later change that code), a Travis build will automatically be kicked off.  A note will be added to the PR, and will indicate the current status of the build.


NOTE: Derived from https://raw.githubusercontent.com/emberjs/ember.js/master/CONTRIBUTING.md
