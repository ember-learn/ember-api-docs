import { module, test } from 'qunit';
/* eslint-disable ember/no-restricted-resolver-tests */
import { setupTest } from 'ember-qunit';

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
  'ember-2.10.0-ember-views'
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
  'ember-views'
];

module('Unit | Controller | project version', function(hooks) {
  setupTest(hooks);

  test('should render module names', function(assert) {
    let controller = this.owner.factoryFor('controller:project-version').create({
      getRelations() {
        return moduleIds;
      }
    });

    let moduleNames = controller.getModuleRelationships('ember-2.10.1');
    assert.deepEqual(moduleNames, expectedModuleNames);
  });
});