import { skip } from 'qunit';
import { visit } from 'ember-native-dom-helpers';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

skip('switching versions', async function(assert) {
  // Classes

  await visit('/ember/1.0/classes/Ember.Component');
  assert.equal(currentURL(), '/ember/1.0/classes/Ember.Component', 'navigated to v1.0 class');

  await selectChoose('.select-container', '1.4');
  assert.equal(currentURL(), '/ember/1.4/classes/Ember.Component', 'navigated to v1.4 class');

  await selectChoose('.select-container', '1.0');
  assert.equal(currentURL(), '/ember/1.0/classes/Ember.Component', 'navigated to v1.0 class');

  // Namespaces

  await visit('/ember/2.7/namespaces/Ember.String');
  assert.equal(currentURL(), '/ember/2.7/namespaces/Ember.String', 'navigated to v2.7 namespace');

  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/namespaces/Ember.String', 'navigated to v2.11 namespace');

  await selectChoose('.select-container', '2.8');
  assert.equal(currentURL(), '/ember/2.8/namespaces/Ember.String', 'navigated to v2.8 namespace');

  // Modules

  await visit('/ember/2.8/modules/ember-metal');
  assert.equal(currentURL(), '/ember/2.8/modules/ember-metal', 'navigated to v2.8 module');

  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/modules/ember-metal', 'navigated to v2.11 module');

  await selectChoose('.select-container', '2.7');
  assert.equal(currentURL(), '/ember/2.7/modules/ember-metal', 'navigated to v2.7 module');
});
