import { githubLink } from 'ember-api-docs/helpers/github-link';
import { module, test } from 'qunit';

module('Unit | Helper | github link', function() {
  test('should render a github link for ember from file info', function(assert) {
    let result = githubLink(['ember', '2.10.0', 'ember-glimmer/lib/component.js', '35'], {});
    assert.equal(result, 'https://github.com/emberjs/ember.js/tree/v2.10.0/ember-glimmer/lib/component.js#L35');
  });

  test('should render a github link for ember-data from file info', function(assert) {
    let result = githubLink(['ember-data', '2.10.0', 'addon/-private/adapters/errors.js', '10'], {});
    assert.equal(result, 'https://github.com/emberjs/data/tree/v2.10.0/addon/-private/adapters/errors.js#L10');
  });

  test('should render a github link for ember-data from file info for v3.11+', function(assert) {
    let result = githubLink(['ember-data', '3.12.2', '../adapter/addon/-private/adapters/errors.ts', '8'], {});
    assert.equal(result, 'https://github.com/emberjs/data/tree/v3.12.2/packages/-ember-data/../adapter/addon/-private/adapters/errors.ts#L8');
  });
});
