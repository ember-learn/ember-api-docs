import { moduleFor, test } from 'ember-qunit';

moduleFor('service:meta-store', 'Unit | Service | meta-store');

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('correct version selected', function(assert) {
  let service = this.subject();
  service.set('availableProjectVersions.ember', ['2.15.0', '2.14.1', '2.13.4', '1.0.0', '1.1.0', '1.1.2', '1.10.1', '1.11.4', '1.12.2', '1.13.13', '1.2.1','1.2.2', '1.2.0', '1.3.2', '1.4.0', '1.5.1', '1.6.1', '1.7.1', '1.8.1', '1.9.1', '2.0.3', '2.1.2', '2.10.2', '2.11.3', '2.12.2', '2.13.3', '2.2.2', '2.2.1', '2.2.0', '2.3.2', '2.4.6', '2.5.1', '2.6.2', '2.7.3', '2.8.3', '2.9.1', '2.14.0']);
  let matchA = service.getFullVersion('ember', '1.2')
  let matchB = service.getFullVersion('ember', '1.1')
  let matchC = service.getFullVersion('ember', '2.2')
  assert.equal(matchA, '1.2.2')
  assert.equal(matchB, '1.1.2')
  assert.equal(matchC, '2.2.2')
});
