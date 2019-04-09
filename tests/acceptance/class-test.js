import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll, currentURL } from '@ember/test-helpers';

module('Acceptance | Class', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/ember/1.0/classes/Container');
    await click('[data-test-checkbox="inherited"]');
    await click('[data-test-checkbox="protected"]');
    await click('[data-test-checkbox="private"]');
    await click('[data-test-checkbox="deprecated"]');
  });

  test('lists all the methods on the class page', async function (assert) {
    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('class', 'ember-1.0.0-Container');
    assert.equal(findAll('.spec-method-list li').length, container.get('methods.length'));

    await click('[data-test-checkbox="private"]'); // turn private back off

    assert.equal(findAll('.spec-method-list li').length,
      container.get('methods').filter(method => method.access !== 'private').length);
  });

  test('lists all the properties on the class page', function (assert) {
    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('class', 'ember-1.0.0-Container');
    assert.equal(findAll('.spec-property-list li').length, container.get('properties.length'));
  });

  test('lists all the events on the class page', function (assert) {
    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('class', 'ember-1.0.0-Container');
    assert.equal(findAll('.spec-event-list li').length, container.get('events.length'));
  });

  test('has query params for access visibilities', function (assert) {
    let params = (currentURL().match(/show=([\w\d%]*)/)[1] || '').split('%2C');
    assert.notOk(params.includes('inherited'), 'show param does not include inherited because it is the default and we unselected it');
    assert.ok(params.includes('protected'), 'show param includes protected');
    assert.ok(params.includes('private'), 'show param includes private');
    assert.ok(params.includes('deprecated'), 'show param includes deprecated');
  });
});
