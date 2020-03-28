import { A } from '@ember/array';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import { module, test } from 'qunit';

module('Unit | Utility | get-latest-version', function() {
  test('should pick the latest version of ember', function (assert) {
    let versions = A([
      'ember-1.13.0',
      'ember-2.7',
      'ember-2.1.10'
    ]);
    let latestVersion = getLastVersion(versions);
    assert.equal(latestVersion, '2.7');
  });

  test('should pick the latest version of ember-data', function (assert) {
    let versions = A([
      'ember-data-1.13.0',
      'ember-data-2.7',
      'ember-data-2.1.10'
    ]);
    let latestVersion = getLastVersion(versions);
    assert.equal(latestVersion, '2.7');
  });
});
