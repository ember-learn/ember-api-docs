import Ember from 'ember';
import FastbootFixInitializer from 'ember-api-docs/initializers/fastboot-fix';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | fastboot fix', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FastbootFixInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
