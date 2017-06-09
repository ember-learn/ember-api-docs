import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

test('switching versions', async function(assert) {
  // Classes

  await visit('/ember/1.0.0/classes/Ember.Component');
  assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to v1.0.0 class');

  await selectChoose('.select-container', '1.4');
  assert.equal(currentURL(), '/ember/1.4.0/classes/Ember.Component', 'navigated to v1.4.0 class');

  await selectChoose('.select-container', '1.0');
  assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to v1.0.0 class');

  // Namespaces

  await visit('/ember/2.7.3/namespaces/Ember.String');
  assert.equal(currentURL(), '/ember/2.7.3/namespaces/Ember.String', 'navigated to v2.7.3 namespace');

  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11.3/namespaces/Ember.String', 'navigated to v2.11.3 namespace');

  await selectChoose('.select-container', '2.8');
  assert.equal(currentURL(), '/ember/2.8.3/namespaces/Ember.String', 'navigated to v2.8.3 namespace');

  // Modules

  await visit('/ember/2.8.3/modules/ember-metal');
  assert.equal(currentURL(), '/ember/2.8.3/modules/ember-metal', 'navigated to v2.8.3 module');

  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11.3/modules/ember-metal', 'navigated to v2.11.3 module');

  await selectChoose('.select-container', '2.7');
  assert.equal(currentURL(), '/ember/2.7.3/modules/ember-metal', 'navigated to v2.7.3 module');
});
