import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | ItemRoutes');

test('Can navigate to method from class', async function(assert) {
  await visit('/ember/1.0.0/classes/Container');
  await click(`.spec-method-list ${testSelector('item', 'child')} a`);

  assert.equal(currentURL(), '/ember/1.0.0/classes/Container/methods/child?anchor=child', 'navigated to method');
});

test('Can navigate to property from class', async function(assert) {
  await visit('/ember/1.0.0/classes/Container');
  await click(`.spec-property-list ${testSelector('item', 'cache')} a`);

  assert.equal(currentURL(), '/ember/1.0.0/classes/Container/properties/cache?anchor=cache', 'navigated to property');
});

test('Can navigate to method from namespace', async function(assert) {
  await visit('/ember/1.0.0/namespaces/Ember');
  await click(`.spec-method-list ${testSelector('item', 'A')} a`);

  assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/methods/A?anchor=A', 'navigated to method');
});

test('Can navigate to property from namespace', async function(assert) {
  await visit('/ember/1.0.0/namespaces/Ember');
  await click(`.spec-property-list ${testSelector('item', 'ENV')} a`);

  assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/properties/ENV?anchor=ENV', 'navigated to property');
});

test('Can navigate to event from namespace', async function(assert) {
  await visit('/ember/1.0.0/namespaces/Ember');
  await click(`.spec-event-list ${testSelector('item', 'onerror')} a`);

  assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/events/onerror?anchor=onerror', 'navigated to event');
});
