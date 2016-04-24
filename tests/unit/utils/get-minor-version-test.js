import getMinorVersion from 'ember-api-docs/utils/get-minor-version';
import { module, test } from 'qunit';

module('Unit | Utility | get minor version');

test('minorVersion returns the minor version of a version string', function(assert) {
  assert.equal(getMinorVersion('0.0.0'), "0.0");
  assert.equal(getMinorVersion('0.1.1'), "0.1");
  assert.equal(getMinorVersion('1.0.0'), "1.0");
  assert.equal(getMinorVersion('1.2.3'), "1.2");
  assert.equal(getMinorVersion('1.13.15'), "1.13");
  assert.equal(getMinorVersion('2.3.4'), "2.3");
});
