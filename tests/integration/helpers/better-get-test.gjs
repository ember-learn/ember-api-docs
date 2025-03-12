import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import betterGet from "ember-api-docs/helpers/better-get";

module('helper:better-get', function (hooks) {
  setupRenderingTest(hooks);

  test('should get dot separated', async function (assert) {const self = this;

    let obj = {
      'Ember.Object': 'hello',
    };
    this.set('dataStructure', obj);
    this.set('key', 'Ember.Object');

    await render(<template>{{betterGet self.dataStructure self.key}}</template>);

    assert.dom(this.element).hasText('hello');
  });

  test('should get rfc 176 module', async function (assert) {const self = this;

    let obj = {
      '@ember/object': 'hello',
    };
    this.set('dataStructure', obj);
    this.set('key', '@ember/object');

    await render(<template>{{betterGet self.dataStructure self.key}}</template>);

    assert.dom(this.element).hasText('hello');
  });
});
