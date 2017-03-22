import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';

moduleForAcceptance('Acceptance | Application Layout');

test('lists the project versions in a select box', function(assert) {
  visit('/ember/1.0.0/classes/Ember.Component');

  andThen(() => {
    selectSearch('.select-container', '2');
  });

  andThen(() => {
    assert.equal(find('.ember-power-select-options').length, 1);
    assert.ok(find('.ember-power-select-options')[0].children.length > 1);
  });

});
