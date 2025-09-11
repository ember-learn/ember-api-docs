import { module, test } from 'qunit';
/* eslint-disable ember/no-restricted-resolver-tests */
import { setupTest } from 'ember-qunit';
import { findEndingRoute } from 'ember-api-docs/controllers/project-version';

const moduleIds = [
  'ember-2.10.0-ember',
  'ember-2.10.0-ember-application',
  'ember-2.10.0-ember-debug',
  'ember-2.10.0-ember-extension-support',
  'ember-2.10.0-ember-glimmer',
  'ember-2.10.0-ember-htmlbars',
  'ember-2.10.0-ember-metal',
  'ember-2.10.0-ember-routing',
  'ember-2.10.0-ember-runtime',
  'ember-2.10.0-ember-testing',
  'ember-2.10.0-ember-views',
];

const expectedModuleNames = [
  'ember',
  'ember-application',
  'ember-debug',
  'ember-extension-support',
  'ember-glimmer',
  'ember-htmlbars',
  'ember-metal',
  'ember-routing',
  'ember-runtime',
  'ember-testing',
  'ember-views',
];

module('Unit | Controller | project version', function (hooks) {
  setupTest(hooks);

  test('should render module names', function (assert) {
    let controller = this.owner
      .factoryFor('controller:project-version')
      .create({
        getRelations() {
          return moduleIds;
        },
      });

    let moduleNames = controller.getModuleRelationships('ember-2.10.1');
    assert.deepEqual(moduleNames, expectedModuleNames);
  });

  module('findEndingRoute', function () {
    test('Maintains anchors', function (assert) {
      let endingRoute = findEndingRoute({
        project: 'ember',
        targetVersion: '6.4.0',
        currentVersion: '6.5.0',
        currentRouteName: 'project-version.classes.class',
        classModelName: 'Component',
        moduleModelName: null,
        namespaceModelName: null,
        currentAnchor: '#didInsertElement',
      });

      assert.strictEqual(
        endingRoute,
        '/ember/6.4/classes/Component#didInsertElement',
      );

      endingRoute = findEndingRoute({
        project: 'ember',
        targetVersion: '6.4.0',
        currentVersion: '6.5.0',
        currentRouteName: 'project-version.modules.module',
        classModelName: null,
        moduleModelName: '@ember/application',
        namespaceModelName: null,
        currentAnchor: '#classes',
      });

      assert.strictEqual(
        endingRoute,
        '/ember/6.4/modules/%40ember%2Fapplication#classes',
      );
    });
  });
});
