import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

test('switching versions', function(assert) {
  visit('/ember/1.0.0/classes/Ember.Component');

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to 1.0.0');
    selectChoose('.select-container', '1.4');
  });


  andThen(() => {
    assert.equal(currentURL(), '/ember/1.4.0/classes/Ember.Component', 'navigated to 1.4.0');
    selectChoose('.select-container', '1.0');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to 1.0.0');
  });
});
