import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:meta-store', 'Unit | Service | meta-store');

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  const versions = ['2.12.2','2.11.3','2.13.3','2.10.2','2.9.1','2.8.3','2.7.3','2.6.2','2.5.1','2.4.6','2.3.2','2.2.2','2.1.2','2.0.3','1.13.13','1.12.2','1.11.4','1.10.1','1.9.1','1.0.0','1.8.1','1.7.1','1.6.1','1.5.1','1.4.0','1.3.2','1.2.2','1.1.2'];
  service.set('availableProjectVersions.ember', Ember.A(versions));

  assert.equal(service.get('semVerSortedProjectVersions.ember.length'), versions.length);
  assert.equal(service.get('semVerSortedProjectVersions.ember.firstObject.id'), '2.13.3');
  assert.equal(service.get('semVerSortedProjectVersions.ember.firstObject.minorVersion'), '2.13');
  assert.equal(service.get('semVerSortedProjectVersions.ember.lastObject.id'), '1.0.0');
  assert.equal(service.get('semVerSortedProjectVersions.ember.lastObject.minorVersion'), '1.0');
});
