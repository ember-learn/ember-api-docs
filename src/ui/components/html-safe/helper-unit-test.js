
import { htmlSafe } from "ember-api-docs/src/ui/components/html-safe/helper";
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | html safe');

// Replace this with your real tests.
test('it should be safe', function(assert) {
  const content =`watchfire""onmouseover=""alert(800)""</imput>`;
  let result = htmlSafe([content]);
  assert.deepEqual(result, Ember.String.htmlSafe(content));
});

