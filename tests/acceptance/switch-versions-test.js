import { test } from 'qunit';
import { visit } from 'ember-native-dom-helpers';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

test('switching class versions less than 2.16 should retain class page', async function(assert) {
  await visit('/ember/2.7/classes/Ember.Component');
  assert.equal(currentURL(), '/ember/2.7/classes/Ember.Component', 'navigated to v2.7 namespace');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component', 'navigated to v2.11 class');
  await selectChoose('.select-container', '1.4');
  assert.equal(currentURL(), '/ember/1.4/classes/Ember.Component', 'navigated to v2.8 class');
});

test('switching namespace versions less than 2.16 should retain namespace page', async function (assert) {
  await visit('/ember/2.7/namespaces/Ember');
  assert.equal(currentURL(), '/ember/2.7/namespaces/Ember');
  await selectChoose('.select-container', '2.7');
  assert.equal(currentURL(), '/ember/2.7/namespaces/Ember');
  await selectChoose('.select-container', '1.4');
  assert.equal(currentURL(), '/ember/1.4/namespaces/Ember');
});

test('switching module versions less than 2.16 should retain module page', async function(assert) {
  await visit('/ember/2.8/modules/ember-metal');
  assert.equal(currentURL(), '/ember/2.8/modules/ember-metal', 'navigated to v2.8 module');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/modules/ember-metal', 'navigated to v2.11 module');
  await selectChoose('.select-container', '1.4');
  assert.equal(currentURL(), '/ember/1.4/modules/ember-metal', 'navigated to v2.7 module');
});

test('switching specific method less than 2.16 should retain method', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.8 method');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.11 method');
});

test('switching specific event less than 2.16 should retain event', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.8 method');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.11 method');
});

test('switching specific property less than 2.16 should retain property', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed', 'navigated to v2.8 property');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed', 'navigated to v2.11 property');
});

test('switching class methods tab less than 2.16 should retain', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/methods')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/methods', 'navigated to v2.8 methods');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/methods', 'navigated to v2.11 methods');
});

test('switching class events tab less than 2.16 should retain', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/events')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/events', 'navigated to v2.8 events');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/events', 'navigated to v2.11 events');
});

test('switching class properties tab less than 2.16 should retain', async function (assert) {
  await visit('/ember/2.8/classes/Ember.Component/properties')
  assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/properties', 'navigated to v2.8 properties');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/properties', 'navigated to v2.11 properties');
});

test('switching from class version less than 2.16 to class version 2.16 should reset to first module page', async function(assert) {
  await visit('/ember/2.7/classes/Ember.Component');
  assert.equal(currentURL(), '/ember/2.7/classes/Ember.Component', 'navigated to v2.7 class');
  await selectChoose('.select-container', '2.16');
  assert.equal(currentURL(), '/ember/2.16/modules/@ember%2Fapplication', 'navigated to v2.16 application module');
});

test('switching from class version 2.16 to class version less then 2.16 should reset to first module page', async function (assert) {
  await visit('/ember/2.16/classes/Component');
  assert.equal(currentURL(), '/ember/2.16/classes/Component', 'navigated to v2.16 class');
  await selectChoose('.select-container', '2.11');
  assert.equal(currentURL(), '/ember/2.11/modules/ember', 'navigated to v2.11 ember module');
});



