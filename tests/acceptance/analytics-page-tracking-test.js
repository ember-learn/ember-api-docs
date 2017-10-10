import { run } from '@ember/runloop';
import { skip } from 'qunit';
import { visit } from 'ember-native-dom-helpers';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';

moduleForAcceptance('Acceptance | analytics page tracking');

skip('checking that trackPage gets called on transitions', async function(assert) {

  const pages = ['/ember/2.11/namespaces/Ember', '/ember/2.11/modules/ember-metal', '/ember/2.11/classes/Ember.Application'];
  const pagesClone = pages.slice(0);
  const analyticsService = this.application.__container__.lookup('service:analytics');
  assert.expect(pages.length);

  // extend the method to add assertion in it
  let oldTrackPage = analyticsService.trackPage;
  analyticsService.trackPage = (page, title) => {
    run(() => {
      oldTrackPage.apply(analyticsService, ...arguments).then(() => assert.equal(page, pagesClone.shift()));
    });
  };

  await visit(pages[0]);
  await visit(pages[1]);
  await visit(pages[2]);

  // make sure the test runner waits for last idle callback
  return requestIdlePromise(2000);
});
