import { moduleFor, test } from 'ember-qunit';

const moduleIds = [
  "ember-2.10.0-ember",
  "ember-2.10.0-ember-application",
  "ember-2.10.0-ember-debug",
  "ember-2.10.0-ember-extension-support",
  "ember-2.10.0-ember-glimmer",
  "ember-2.10.0-ember-htmlbars",
  "ember-2.10.0-ember-metal",
  "ember-2.10.0-ember-routing",
  "ember-2.10.0-ember-runtime",
  "ember-2.10.0-ember-testing",
  "ember-2.10.0-ember-views"
];

const expectedModuleNames = [
  "ember",
  "ember-application",
  "ember-debug",
  "ember-extension-support",
  "ember-glimmer",
  "ember-htmlbars",
  "ember-metal",
  "ember-routing",
  "ember-runtime",
  "ember-testing",
  "ember-views"
];

moduleFor('controller:project-version', 'Unit | Controller | project version', {
  needs: ['service:filterData', 'service:metaStore', 'service:analytics', 'service:project']
});

test('should render module names', function(assert) {
  let controller = this.subject({
    getRelations() {
      return moduleIds;
    }
  });

  let moduleNames = controller.getModuleRelationships('ember-2.10.1');
  assert.deepEqual(moduleNames, expectedModuleNames);
});
