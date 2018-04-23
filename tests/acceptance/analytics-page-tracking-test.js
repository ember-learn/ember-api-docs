import { visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';

module('Acceptance | analytics page tracking', function(hooks) {
  setupApplicationTest(hooks);

  test('checking that trackPage gets called on transitions', async function(assert) {
    const pages = [
      '/ember/2.11/namespaces/Ember',
      '/ember/2.11/modules/ember-metal',
      '/ember/2.11/classes/Ember.Application'
    ];
    const pagesClone = pages.slice(0);
    const analyticsService = this.owner.lookup('service:analytics');
    assert.expect(pages.length);

    // extend the method to add assertion in it
    let oldTrackPage = analyticsService.trackPage;
    analyticsService.trackPage = page => {
      run(() =>
        oldTrackPage
          .apply(analyticsService, ...arguments)
          .then(() => assert.equal(page, pagesClone.shift()))
      );
    };

    await visit(pages[0]);
    await visit(pages[1]);
    await visit(pages[2]);

    // make sure the test runner waits for last idle callback
    return requestIdlePromise(2000);
  });
});
