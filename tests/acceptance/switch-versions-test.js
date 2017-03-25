import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | version navigation');

test('switching versions', function(assert) {
  visit('/ember/1.0.0/classes/Ember.Component');

  // Classes

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to v1.0.0 class');
    selectChoose('.select-container', '1.4');
  });


  andThen(() => {
    assert.equal(currentURL(), '/ember/1.4.0/classes/Ember.Component', 'navigated to v1.4.0 class');
    selectChoose('.select-container', '1.0');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to v1.0.0 class');
  });

  // Namespaces

  andThen(() => {
    visit('/ember/2.7.3/namespaces/Ember.String');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.7.3/namespaces/Ember.String', 'navigated to v2.7.3 namespace');
    selectChoose('.select-container', '2.11');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.11.3/namespaces/Ember.String', 'navigated to v2.11.3 namespace');
    selectChoose('.select-container', '2.8');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.8.3/namespaces/Ember.String', 'navigated to v2.8.3 namespace');
  });

  // Modules

  andThen(() => {
    visit('/ember/2.8.3/modules/ember-metal');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.8.3/modules/ember-metal', 'navigated to v2.8.3 module');
    selectChoose('.select-container', '2.11');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.11.3/modules/ember-metal', 'navigated to v2.11.3 module');
    selectChoose('.select-container', '2.7');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/2.7.3/modules/ember-metal', 'navigated to v2.7.3 module');
  });

});
