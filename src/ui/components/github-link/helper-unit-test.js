import { githubLink } from "ember-api-docs/src/ui/components/github-link/helper";
import { module, test } from 'qunit';

module('Unit | Helper | github link');

test('should render a github link from file info', function(assert) {
  let result = githubLink(['ember', '2.10.0', 'ember-glimmer/lib/component.js', '35']);
  assert.equal(result, 'https://github.com/emberjs/ember.js/tree/v2.10.0/ember-glimmer/lib/component.js#L35');
});
