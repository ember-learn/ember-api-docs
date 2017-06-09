import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import _ from 'lodash';
import { visit } from 'ember-native-dom-helpers';
import semverCompare from 'npm:semver-compare';

moduleForAcceptance('Acceptance | redirects');

test('visiting /', async function(assert) {
  await visit('/');

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

test('visiting /:project/:project_version/classes', async function(assert) {
  await visit('/ember/1.0.0/classes');

  assert.equal(
    currentURL(),
    '/ember/1.0.0/namespaces/Ember',
    'routes to the first namespace of the project-version'
  );
});
