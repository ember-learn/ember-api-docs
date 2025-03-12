import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import functionHeadingId from "ember-api-docs/helpers/function-heading-id";

module('helper:function-heading-id', function (hooks) {
  setupRenderingTest(hooks);

  test('should transform nested package to id', async function (assert) {const self = this;

    this.set('inputValue', '@ember/object/computed');

    await render(<template>{{functionHeadingId self.inputValue}}</template>);

    assert.dom(this.element).hasText('functions-computed');
  });
});
