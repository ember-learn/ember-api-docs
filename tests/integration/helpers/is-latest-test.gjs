import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { A } from '@ember/array';
import isLatest from "ember-api-docs/helpers/is-latest";

const versions = A(['ember-1.13.0', 'ember-3.5.0', 'ember-2.1.10']);

module('helper:is-latest', function (hooks) {
  setupRenderingTest(hooks);

  test('should resolve true if latest release', async function (assert) {const self = this;

    this.set('version', '3.5.0');
    this.set('allVersions', versions);

    await render(<template>
  {{#if (isLatest version=self.version allVersions=self.allVersions)}}
    Hello World
  {{/if}}
  </template>);

    assert.dom(this.element).hasText('Hello World');
  });

  test('should resolve false if not latest', async function (assert) {const self = this;

    this.set('version', '3.1.0');
    this.set('allVersions', versions);
    await render(<template>
  {{#if (isLatest version=self.version allVersions=self.allVersions)}}
    Hello World
  {{/if}}
  </template>);
    assert.notEqual(this.element.textContent.trim(), 'Hello World');
  });
});
