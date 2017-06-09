import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sidebar navigation');

test('can navigate to namespace from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click('.toc-level-1.namespaces a:contains(Ember.String)');

  assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember.String', 'navigated to namespace');
});

test('can navigate to module from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click('.toc-level-1.modules a:contains(ember-application)');

  assert.equal(currentURL(), '/ember/1.0.0/modules/ember-application', 'navigated to module');
});

test('can navigate to class from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click('.toc-level-1.classes a:contains(Ember.Component)');

  assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to class');
});
