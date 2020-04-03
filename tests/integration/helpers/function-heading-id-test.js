import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:function-heading-id', function(hooks) {
  setupRenderingTest(hooks);

  test('should transform nested package to id', async function(assert) {
    this.set('inputValue', '@ember/object/computed');

    await render(hbs`{{function-heading-id inputValue}}`);

    assert.dom(this.element).hasText('functions-computed');
  });
});
