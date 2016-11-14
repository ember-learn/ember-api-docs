import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';

moduleForAcceptance('ItemRoutes');

test('Can navigate to method from class', function(assert) {
  visit('/ember/1.0.0/classes/Container');
  click('.spec-method-list a:contains(child)');

  andThen(function() {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Container/methods/child?anchor=child', 'navigated to method');
  });
});

test('Can navigate to property from class', function(assert) {
  visit('/ember/1.0.0/classes/Container');
  click('.spec-property-list a:contains(cache)');

  andThen(function() {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Container/properties/cache?anchor=cache', 'navigated to property');
  });
});

test('Can navigate to method from namespace', function(assert) {
  visit('/ember/1.0.0/namespaces/Ember');
  click('.spec-method-list a:contains(A)');

  andThen(function() {
    assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/methods/A?anchor=A', 'navigated to method');
  });
});

test('Can navigate to property from namespace', function(assert) {
  visit('/ember/1.0.0/namespaces/Ember');
  click('.spec-property-list a:contains(ENV)');

  andThen(function() {
    assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/properties/ENV?anchor=ENV', 'navigated to property');
  });
});

test('Can navigate to event from namespace', function(assert) {
  visit('/ember/1.0.0/namespaces/Ember');
  click('.spec-event-list a:contains(onerror)');

  andThen(function() {
    assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember/events/onerror?anchor=onerror', 'navigated to event');
  });
});
