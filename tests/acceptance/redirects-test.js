import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | redirects');

test('visiting /', function(assert) {
  visit('/');

  const last = "2.6.0"; // need help for how to get this

  return andThen(function() {
    assert.equal(
      currentURL(),
      `/ember/${last}/namespaces/Ember`,
      'routes to the latest version of the project'
    );
  });
});

test('visiting /:project/:project_version/classes', function(assert) {
  visit('/ember/1.0.0/classes');

  return andThen(function() {
    assert.equal(
      currentURL(),
      '/ember/1.0.0/namespaces/Ember',
      'routes to the first namespace of the project-version'
    );
  });
});
