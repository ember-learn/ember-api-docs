import { currentURL, visit } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | version navigation', function(hooks) {
  setupApplicationTest(hooks);


  test('switching class versions less than 2.16 should retain class page', async function(assert) {
    await visit('/ember/2.7/classes/Ember.Component');
    assert.equal(currentURL(), '/ember/2.7/classes/Ember.Component', 'navigated to v2.7 namespace');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component', 'navigated to v2.11 class');
    await selectChoose('.ember-power-select-trigger', '1.4');
    assert.equal(currentURL(), '/ember/1.4/classes/Ember.Component', 'navigated to v2.8 class');
  });

  test('switching namespace versions less than 2.16 should retain namespace page', async function (assert) {
    await visit('/ember/2.7/namespaces/Ember');
    assert.equal(currentURL(), '/ember/2.7/namespaces/Ember');
    await selectChoose('.ember-power-select-trigger', '2.7');
    assert.equal(currentURL(), '/ember/2.7/namespaces/Ember');
    await selectChoose('.ember-power-select-trigger', '1.4');
    assert.equal(currentURL(), '/ember/1.4/namespaces/Ember');
  });

  test('switching module versions less than 2.16 should retain module page', async function(assert) {
    await visit('/ember/2.8/modules/ember-metal');
    assert.equal(currentURL(), '/ember/2.8/modules/ember-metal', 'navigated to v2.8 module');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/modules/ember-metal', 'navigated to v2.11 module');
    await selectChoose('.ember-power-select-trigger', '1.4');
    assert.equal(currentURL(), '/ember/1.4/modules/ember-metal', 'navigated to v2.7 module');
  });


  test('switching module versions greater than 2.16 should retain module page', async function(assert) {
    await visit('/ember/2.18/modules/@ember%2Fapplication');
    assert.equal(currentURL(), '/ember/2.18/modules/@ember%2Fapplication', 'navigated to v2.18 module');
    await selectChoose('.ember-power-select-trigger', '2.17');
    assert.equal(currentURL(), '/ember/2.17/modules/@ember%2Fapplication', 'navigated to v2.17 module');
    await selectChoose('.ember-power-select-trigger', '2.16');
    assert.equal(currentURL(), '/ember/2.16/modules/@ember%2Fapplication', 'navigated to v2.16 module');
  });

  test('switching specific method less than 2.16 should retain method', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.8 method');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/methods/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.11 method');
  });

  test('switching specific event less than 2.16 should retain event', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.8 method');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/events/didReceiveAttrs?anchor=didReceiveAttrs', 'navigated to v2.11 method');
  });

  test('switching specific property less than 2.16 should retain property', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed', 'navigated to v2.8 property');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/properties/isDestroyed?anchor=isDestroyed', 'navigated to v2.11 property');
  });

  test('switching class methods tab less than 2.16 should retain', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/methods')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/methods', 'navigated to v2.8 methods');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/methods', 'navigated to v2.11 methods');
  });

  test('switching class events tab less than 2.16 should retain', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/events')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/events', 'navigated to v2.8 events');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/events', 'navigated to v2.11 events');
  });

  test('switching class properties tab less than 2.16 should retain', async function (assert) {
    await visit('/ember/2.8/classes/Ember.Component/properties')
    assert.equal(currentURL(), '/ember/2.8/classes/Ember.Component/properties', 'navigated to v2.8 properties');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/classes/Ember.Component/properties', 'navigated to v2.11 properties');
  });

  test('switching from class version less than 2.16 to class version 2.16 should reset to landing page', async function(assert) {
    await visit('/ember/2.7/classes/Ember.Component');
    assert.equal(currentURL(), '/ember/2.7/classes/Ember.Component', 'navigated to v2.7 class');
    await selectChoose('.ember-power-select-trigger', '2.16');
    assert.equal(currentURL(), '/ember/2.16', 'navigated to v2.16 landing page');
  });

  test('switching from class version less than 2.16 to class version 2.16 should retain if project is ember-data', async function(assert) {
    await visit('/ember-data/2.7/classes/DS.Adapter');
    assert.equal(currentURL(), '/ember-data/2.7/classes/DS.Adapter', 'navigated to v2.7 class');
    await selectChoose('.ember-power-select-trigger', '2.16');
    assert.equal(currentURL(), '/ember-data/2.16/classes/DS.Adapter', 'navigated to v2.16 landing page');
  });

  test('switching from class version 2.16 to class version less then 2.16 should reset to first module page', async function (assert) {
    await visit('/ember/2.16/classes/Component');
    assert.equal(currentURL(), '/ember/2.16/classes/Component', 'navigated to v2.16 class');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember/2.11/modules/ember', 'navigated to v2.11 ember module');
  });

  test('switching from class version 2.16 to class version less then 2.16 should retain if project is ember-data', async function(assert) {
    await visit('/ember-data/2.16/classes/DS.Adapter');
    assert.equal(currentURL(), '/ember-data/2.16/classes/DS.Adapter', 'navigated to v2.7 class');
    await selectChoose('.ember-power-select-trigger', '2.11');
    assert.equal(currentURL(), '/ember-data/2.11/classes/DS.Adapter', 'navigated to v2.16 landing page');
  });

  test('switching versions works if class name includes slashes', async function(assert) {
    await visit('/ember/3.4/classes/@ember%2Fobject%2Fcomputed');
    assert.equal(currentURL(), '/ember/3.4/classes/@ember%2Fobject%2Fcomputed', 'navigated to v3.4 class');
    await selectChoose('.ember-power-select-trigger', '3.7');
    assert.equal(currentURL(), '/ember/3.7/classes/@ember%2Fobject%2Fcomputed', 'navigated to v3.7 class');
  });

  test(`switching versions works if we've previously switched for a different class`, async function(assert) {
    await visit('/ember/3.4/classes/@ember%2Fobject%2Fcomputed');
    assert.equal(currentURL(), '/ember/3.4/classes/@ember%2Fobject%2Fcomputed', 'navigated to v3.4 class');
    await selectChoose('.ember-power-select-trigger', '3.7');
    assert.equal(currentURL(), '/ember/3.7/classes/@ember%2Fobject%2Fcomputed', 'navigated to v3.7 class');
    await visit('/ember/3.7/classes/Component');
    assert.equal(currentURL(), '/ember/3.7/classes/Component', 'navigated to new class');
    await selectChoose('.ember-power-select-trigger', '2.18');
    assert.equal(currentURL(), '/ember/2.18/classes/Component', 'navigated to v2.18 for new class');
  });
});
