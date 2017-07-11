import { moduleForModel, test } from 'ember-qunit';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: ['service:metaStore', 'model:project-version']
});

test('it picks correct version', function(assert) {
  let model = this.subject({
    id: 'ember'
  });

  let metaStore = model.get('metaStore');
  metaStore.set('availableProjectVersions.ember', ['2.12.2','2.11.3','2.13.3','2.10.2','2.9.1','2.8.3','2.7.3','2.6.2','2.5.1','2.4.6','2.3.2','2.2.2','2.1.2','2.0.3','1.13.13','1.12.2','1.11.4','1.10.1','1.9.1','1.8.1','1.7.1','1.6.1','1.5.1','1.4.0','1.3.2','1.2.2','1.1.2','1.0.0'])
  assert.equal(model.get('latestProjectVersion.id'), '2.13.3');
  assert.equal(model.get('latestProjectVersion.compactVersion'), '2.13');

});
