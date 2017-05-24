import Ember from 'ember';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import { module, test } from 'qunit';

const { Object } = Ember;

let versions = [];

module('Unit | Utility | version', {
  beforeEach() {
    versions.push(Object.create({ id: 'ember-1.13.0' }));
    versions.push(Object.create({ id: 'ember-2.7' }));
    versions.push(Object.create({ id: 'ember-2.1.10' }));
  },
  afterEach() {
    versions.splice(0, versions.length);
  }
});

test('should pick the latest version', function (assert) {
  let latestVersion = getLastVersion(versions);
  assert.equal(latestVersion, '2.7');
});
