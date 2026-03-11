import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import betterGet from 'ember-api-docs/helpers/better-get';

module('helper:better-get', function (hooks) {
  setupRenderingTest(hooks);

  test('should get dot separated', async function (assert) {
    const dataStructure = {
      'Ember.Object': 'hello',
    };
    const key = 'Ember.Object';

    await render(<template>{{betterGet dataStructure key}}</template>);

    assert.dom().hasText('hello');
  });

  test('should get rfc 176 module', async function (assert) {
    const dataStructure = {
      '@ember/object': 'hello',
    };
    const key = '@ember/object';

    await render(<template>{{betterGet dataStructure key}}</template>);

    assert.dom().hasText('hello');
  });
});
