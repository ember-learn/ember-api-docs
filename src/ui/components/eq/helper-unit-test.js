import { eq } from "ember-api-docs/src/ui/components/eq/helper";
import { module, test } from 'qunit';

module('Unit | Helper | eq');

test('it works', function(assert) {
  let result = eq([404, 404]);
  assert.ok(result);
});
