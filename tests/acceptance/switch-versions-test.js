import { test } from 'qunit';
import { select } from "ember-api-docs/tests/helpers/x-select";

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

test('switching versions', function(assert) {
  visit('/ember/1.0.0/classes/Ember.Component');

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to 1.0.0');
    select('.spec-versions-box', '1.4');
  });


  andThen(() => {
    assert.equal(currentURL(), '/ember/1.4.0/classes/Ember.Component', 'navigated to 1.4.0');
    select('.spec-versions-box', '1.0');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to 1.0.0');
  });
});
