import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:version-lt', function(hooks) {
  setupRenderingTest(hooks);

  test('should calculate major version diffs', async function(assert) {
    await render(hbs`{{version-lt '2.10' '3.0' 'ember'}}`);
    assert.dom(this.element).hasText('true');
  });

  test('should calculate minor version diffs', async function(assert) {
    await render(hbs`{{version-lt '2.15' '2.16' 'ember'}}`);
    assert.dom(this.element).hasText('true');
  });

  test('should fail if major greater', async function(assert) {
    await render(hbs`{{version-lt '3.0' '2.16' 'ember'}}`);
    assert.dom(this.element).hasText('false');
  });

  test('should fail if minor greater', async function(assert) {
    await render(hbs`{{version-lt '2.17' '2.16' 'ember'}}`);
    assert.dom(this.element).hasText('false');
  });

  test('should fail if equal', async function(assert) {
    await render(hbs`{{version-lt '2.16' '2.16' 'ember'}}`);
    assert.dom(this.element).hasText('false');
  });
});

