import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import LoadingSpinner from "ember-api-docs/components/loading-spinner";

module('Integration | Component | loading spinner', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(<template><LoadingSpinner /></template>);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(<template>
      <LoadingSpinner>
        template block text
      </LoadingSpinner>
    </template>);

    assert.dom('*').hasText('template block text');
  });
});
