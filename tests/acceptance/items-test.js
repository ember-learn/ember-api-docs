import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll, currentURL } from '@ember/test-helpers';

module('Acceptance | ItemRoutes', function(hooks) {
  setupApplicationTest(hooks);

  test('Can navigate to method from class', async function(assert) {
    await visit('/ember/1.0/classes/Container');
    await click(`.spec-method-list ${'[data-test-item="child"]'} a`);

    assert.equal(currentURL(), '/ember/1.0/classes/Container/methods/child?anchor=child', 'navigated to method');
  });

  test('Can navigate to method from method name', async function(assert) {
    await visit('ember/1.0/classes/Container/methods/child?anchor=child');
    const newAnchor = findAll('.class-field-description--link')[10];
    await click(newAnchor);

    assert.equal(currentURL(), '/ember/1.0/classes/Container/methods/child?anchor=register', 'navigated to method from method name');
  });

  test('Can navigate to property from class', async function(assert) {
    await visit('/ember/1.0/classes/Container');
    await click(`.spec-property-list ${'[data-test-item="cache"]'} a`);

    assert.equal(currentURL(), '/ember/1.0/classes/Container/properties/cache?anchor=cache', 'navigated to property');
  });

  test('Can navigate to method from namespace', async function(assert) {
    await visit('/ember/1.0/namespaces/Ember');
    await click(`.spec-method-list ${'[data-test-item="A"]'} a`);

    assert.equal(currentURL(), '/ember/1.0/namespaces/Ember/methods/A?anchor=A', 'navigated to method');
  });

  test('Can navigate to property from namespace', async function(assert) {
    await visit('/ember/1.0/namespaces/Ember');
    await click(`.spec-property-list ${'[data-test-item="ENV"]'} a`);

    assert.equal(currentURL(), '/ember/1.0/namespaces/Ember/properties/ENV?anchor=ENV', 'navigated to property');
  });

  test('Can navigate to event from namespace', async function(assert) {
    await visit('/ember/1.0/namespaces/Ember');
    await click(`.spec-event-list ${'[data-test-item="onerror"]'} a`);

    assert.equal(currentURL(), '/ember/1.0/namespaces/Ember/events/onerror?anchor=onerror', 'navigated to event');
  });
});
