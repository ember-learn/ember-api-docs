import { htmlSafe as emberHtmlSafe } from '@ember/string';
import { htmlSafe } from 'ember-api-docs/helpers/html-safe';
import { module, test } from 'qunit';

module('Unit | Helper | html safe', function() {
  test('it should be safe', function(assert) {
    const content =`watchfire""onmouseover=""alert(800)""</imput>`;
    let result = htmlSafe([content]);
    assert.deepEqual(result, emberHtmlSafe(content));
  });
});