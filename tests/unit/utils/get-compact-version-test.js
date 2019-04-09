import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import { module, test } from 'qunit';

module('Unit | Utility | get compact version', function() {
  test('should trim off patch version', function(assert) {
    let result = getCompactVersion('2.17.0');
    assert.equal(result, '2.17');
  });
});