import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';

moduleForAcceptance('Acceptance | analytics page tracking');

test('checking that trackPage gets called on transitions', function(assert) {

  const pages = ['/ember/2.11.3/namespaces/Ember', '/ember/2.11.3/modules/ember-metal', '/ember/2.11.3/classes/Ember.Application'];
  const pagesClone = pages.slice(0);
  const analyticsService = this.application.__container__.lookup('service:analytics');
  assert.expect(pages.length);

  // extend the method to add assertion in it
  let oldTrackPage = analyticsService.trackPage;
  analyticsService.trackPage = (page, title) => {
    Ember.run(() => {
      oldTrackPage.apply(analyticsService, ...arguments).then(() => assert.equal(page, pagesClone.shift()));
    });
  };

  visit(pages[0]);

  andThen(function() {
    visit(pages[1]);
  });

  andThen(function() {
    visit(pages[2]);
  });

  andThen(function() {
    // make sure the test runner waits for last idle callback
    return requestIdlePromise(2000);
  });
});
