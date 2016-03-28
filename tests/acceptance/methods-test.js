import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';
import $ from 'jquery';

moduleForAcceptance('Methods', {
  beforeEach() {
    return visit('/ember/1.0.0/classes/Container');
  }
});

test('lists all the methods on the class page', function (assert) {
  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('class', 'ember-1.0.0-Container');
  assert.equal($(findWithAssert('.spec-method-list li')).length, container.get('methods.length'));
});

