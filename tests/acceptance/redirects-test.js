import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | redirects');

test('visiting /', function(assert) {
  visit('/');

  return andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    const versions = store.peekAll('project-version').toArray();
    const last = versions[versions.length - 1].get('id').split('-')[1];

    assert.equal(
      currentURL(),
      `/ember/${last}/classes/Backburner`,
      'routes to the last class of the project-version'
    );
  });
});

test('visiting /:project/:project_version/classes', function(assert) {
  visit('/ember/1.0.0/classes');

  return andThen(function() {
    assert.equal(
      currentURL(),
      '/ember/1.0.0/classes/Container',
      'routes to the first class of the project-version'
    );
  });
});
