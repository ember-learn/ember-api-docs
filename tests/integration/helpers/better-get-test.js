import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:better-get', function(hooks) {
  setupRenderingTest(hooks);

  test('should get dot separated', async function(assert) {
    let obj = {
      'Ember.Object': 'hello'
    };
    this.set('dataStructure', obj);
    this.set('key', 'Ember.Object');

    await render(hbs`{{better-get dataStructure key}}`);

    assert.dom(this.element).hasText('hello');
  });

  test('should get rfc 176 module', async function(assert) {
    let obj = {
      '@ember/object': 'hello'
    };
    this.set('dataStructure', obj);
    this.set('key', '@ember/object');

    await render(hbs`{{better-get dataStructure key}}`);

    assert.dom(this.element).hasText('hello');
  });
});
