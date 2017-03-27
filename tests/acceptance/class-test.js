import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';
import $ from 'jquery';

moduleForAcceptance('Acceptance | Class', {
  beforeEach() {
    return visit('/ember/1.0.0/classes/Container').then(() => {
      click('.access-checkbox:contains(Inherited)');
      click('.access-checkbox:contains(Protected)');
      click('.access-checkbox:contains(Private)');
      click('.access-checkbox:contains(Deprecated)');
    });
  }
});

test('lists all the methods on the class page', function (assert) {
  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('class', 'ember-1.0.0-Container');
  assert.equal($(findWithAssert('.spec-method-list li')).length, container.get('methods.length'));

  click('.access-checkbox:contains(Private)'); // turn private back off

  andThen(() => {
    assert.equal($(findWithAssert('.spec-method-list li')).length,
      container.get('methods').filter(method => method.access !== 'private').length);
  });
});

test('lists all the properties on the class page', function (assert) {
  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('class', 'ember-1.0.0-Container');
  assert.equal($(findWithAssert('.spec-property-list li')).length, container.get('properties.length'));
});

test('lists all the events on the class page', function (assert) {
  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('class', 'ember-1.0.0-Container');
  assert.equal($(find('.spec-event-list li')).length, container.get('events.length'));
});

test('has query params for access visibilities', function (assert) {
  let params = (currentURL().match(/show=([\w\d%]*)/)[1] || '').split('%2C');
  assert.ok(params.includes('inherited'), 'show param includes inherited');
  assert.ok(params.includes('protected'), 'show param includes protected');
  assert.ok(params.includes('private'), 'show param includes private');
  assert.ok(params.includes('deprecated'), 'show param includes deprecated');
});
