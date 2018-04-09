import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { visit, find } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | redirects');

test('visiting / goes to landing page', async function(assert) {
  await visit('/');
  assert.equal(find('h1').textContent, 'Ember.js API Documentation');
});

test('visiting /ember-data', async function (assert) {
  await visit('/ember-data');
  assert.equal(
    currentURL(),
    `/ember-data/release/modules/ember-data`,
    'routes to the first page of ember data'
  );
  assert.equal(find('h1').textContent, 'Package ember-data');
});

test('visiting pre-2.16 version', async function(assert) {
  await visit('/ember/1.0');

  assert.equal(
    currentURL(),
    '/ember/1.0/modules/ember',
    'routes to the first module of the project-version'
  );
});
