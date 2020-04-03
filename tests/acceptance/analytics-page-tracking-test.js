import { visit } from '@ember/test-helpers';
import config from 'ember-api-docs/config/environment';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';

module('Acceptance | analytics page tracking', function(hooks) {
  setupApplicationTest(hooks);

  test('checking that trackPage gets called on transitions', async function(assert) {
    const pages = [
      '/ember/2.11/namespaces/Ember',
      '/ember/2.11/modules/ember-metal',
      '/ember/2.11/classes/Ember.Application'
    ];

    const applicationRouter = this.owner.lookup('router:main');
    const metricsService = this.owner.lookup('service:metrics');

    const routerTrackPageSpy = sinon.spy(applicationRouter, '__trackPage');
    const serviceTrackPageSpy = sinon.spy(metricsService, 'trackPage');

    await visit(pages[0]);
    await visit(pages[1]);
    await visit(pages[2]);

    assert.expect(5);

    assert.ok(
      routerTrackPageSpy.calledThrice,
      `__trackPage() was not called 3 times it was called ${routerTrackPageSpy.callCount} times`
    );
    assert.ok(
      serviceTrackPageSpy.calledThrice,
      `metrics.trackPage() was not called 3 times it was called ${
        serviceTrackPageSpy.callCount
      } times`
    );

    const hostname = config.APP.domain.replace(/(http|https)?:?\/\//g, '');

    assert.ok(
      serviceTrackPageSpy.calledWith({
        page: '/ember/2.11/namespaces/Ember',
        title: 'project-version.namespaces.namespace.index',
        hostname
      }),
      'service was called with expected arguments for ember namespace page'
    );
    assert.ok(
      serviceTrackPageSpy.calledWith({
        page: '/ember/2.11/modules/ember-metal',
        title: 'project-version.modules.module.index',
        hostname
      }),
      'service was called with expected arguments for ember metal module'
    );
    assert.ok(
      serviceTrackPageSpy.calledWith({
        page: '/ember/2.11/classes/Ember.Application',
        title: 'project-version.classes.class.index',
        hostname
      }),
      'service was called with expected arguments for ember application class'
    );

    // make sure the test runner waits for last idle callback
    return requestIdlePromise(2000);
  });
});
