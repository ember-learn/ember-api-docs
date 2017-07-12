import Ember from 'ember';
import { initialize } from "ember-api-docs/src/init/initializers/scroll-parent-shim/initializer";
import { module, test } from 'qunit';
import destroyApp from "../../../../tests/helpers/destroy-app";

module('Unit | Initializer | scroll parent shim', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.application.deferReadiness();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
