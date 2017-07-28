
import { htmlSafe } from '@ember/string';
import { htmlSafe } from 'ember-api-docs/helpers/html-safe';
import { module, test } from 'qunit';

module('Unit | Helper | html safe');

// Replace this with your real tests.
test('it should be safe', function(assert) {
  const content =`watchfire""onmouseover=""alert(800)""</imput>`;
  let result = htmlSafe([content]);
  assert.deepEqual(result, htmlSafe(content));
});

