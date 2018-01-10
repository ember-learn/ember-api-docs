import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import { visit } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | redirects');

test('visiting /', async function(assert) {
  await visit('/');

  const store = this.application.__container__.lookup('service:store');
  let versions = store.peekAll('project-version').toArray();
  const last = getCompactVersion(getLastVersion(versions));
  assert.equal(
    currentURL(),
    `/ember/${last}/modules/@ember%2Fapplication`,
    'routes to the latest version of the project'
  );
});

test('visiting pre-2.16 version', async function(assert) {
  await visit('/ember/1.0');

  assert.equal(
    currentURL(),
    '/ember/1.0/modules/ember',
    'routes to the first module of the project-version'
  );
});
