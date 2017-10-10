import { skip } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import { visit } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | redirects');

skip('visiting /', async function(assert) {
  await visit('/');

  const store = this.application.__container__.lookup('service:store');
  let versions = store.peekAll('project-version').toArray();
  const last = getLastVersion(versions).split('.').slice(0, 2).join('.');

  assert.equal(
    currentURL(),
    `/ember/${last}/namespaces/Ember`,
    'routes to the latest version of the project'
  );
});

skip('visiting /:project/:project_version/classes', async function(assert) {
  await visit('/ember/1.0/classes');

  assert.equal(
    currentURL(),
    '/ember/1.0/namespaces/Ember',
    'routes to the first namespace of the project-version'
  );
});
