import { eq } from 'ember-api-docs/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq', function() {
  test('it works', function(assert) {
    let result = eq([404, 404]);
    assert.ok(result);
  });
});