import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

const versions = A([
  'ember-1.13.0',
  'ember-3.5.0',
  'ember-2.1.10'
]);

module('helper:is-latest', function (hooks) {
  setupRenderingTest(hooks);

  test('should resolve true if latest release', async function(assert) {
    this.set('version', '3.5.0');
    this.set('allVersions', versions);

    await render(hbs`
  {{#if (is-latest version=version allVersions=allVersions)}}
    Hello World
  {{/if}}
  `);

    assert.dom(this.element).hasText('Hello World');
  });

  test('should resolve false if not latest', async function (assert) {
    this.set('version', '3.1.0');
    this.set('allVersions', versions);
    await render(hbs`
  {{#if (is-latest version=version allVersions=allVersions)}}
    Hello World
  {{/if}}
  `);
    assert.notEqual(this.element.textContent.trim(), 'Hello World');
  })

});
