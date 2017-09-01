import Ember from 'ember';
import { initialize } from 'ember-api-docs/instance-initializers/hash-to-query-redirect';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import hashToQuery from 'hash-to-query';

module('Unit | Instance Initializer | hash to query redirect', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('hashToQuery method works', function(assert) {
  initialize(this.appInstance);

  let redirectToUrl = hashToQuery('method', '/class');
  assert.equal(redirectToUrl, '/class?anchor=method&show=inherited,protected,private,deprecated', 'hashToQuery function works');
});
