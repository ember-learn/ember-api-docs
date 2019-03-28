import config from 'ember-api-docs/config/environment';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';
import { visit } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import sinon from 'sinon';

moduleForAcceptance('Acceptance | analytics page tracking');

test('checking that trackPage gets called on transitions', async function(assert) {
  const pages = [
    '/ember/2.11/namespaces/Ember',
    '/ember/2.11/modules/ember-metal',
    '/ember/2.11/classes/Ember.Application'
  ];

  const applicationRouter = this.application.__container__.lookup('router:main');
  const metricsService = this.application.__container__.lookup('service:metrics');

  const routerTrackPageSpy = sinon.spy(applicationRouter, '_trackPage');
  const serviceTrackPageSpy = sinon.spy(metricsService, 'trackPage');

  await visit(pages[0]);
  await visit(pages[1]);
  await visit(pages[2]);

  assert.expect(5);

  assert.ok(
    routerTrackPageSpy.calledThrice,
    `_trackPage() was not called 3 times it was called ${routerTrackPageSpy.callCount} times`
  );
  assert.ok(
    serviceTrackPageSpy.calledThrice,
    `metrics.trackPage() was not called 3 times it was called ${
      serviceTrackPageSpy.callCount
    } times`
  );

  const hostname = config.APP.domain;
  assert.ok(
    serviceTrackPageSpy.calledWith({
      page: '/ember/2.11/namespaces/Ember',
      title: 'project-version.namespaces.namespace.index',
      hostname
    })
  );
  assert.ok(
    serviceTrackPageSpy.calledWith({
      page: '/ember/2.11/modules/ember-metal',
      title: 'project-version.modules.module.index',
      hostname
    })
  );
  assert.ok(
    serviceTrackPageSpy.calledWith({
      page: '/ember/2.11/classes/Ember.Application',
      title: 'project-version.classes.class.index',
      hostname
    })
  );

  // make sure the test runner waits for last idle callback
  return requestIdlePromise(2000);
});
