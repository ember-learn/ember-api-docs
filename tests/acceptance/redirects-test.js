import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import _ from 'lodash/lodash';
import semverCompare from 'npm:semver-compare';

moduleForAcceptance('Acceptance | redirects');

test('visiting /', function(assert) {
  visit('/');

  return andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    let versions = store.peekAll('project-version').toArray();
    versions = versions.sort((a, b) => {
      const a_ver = _.last(a.get('id').split("-"));
      const b_ver = _.last(b.get('id').split("-"));
      return semverCompare(a_ver, b_ver);
    });
    const last = versions[versions.length - 1].get('id').split('-')[1];

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
