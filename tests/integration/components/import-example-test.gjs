/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import ImportExample from "ember-api-docs/components/import-example";

module('Integration | Component | import example', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a class import example', async function (assert) {
    await render(
      <template><ImportExample @item="Application" @package="@ember/application" /></template>
    );
    assert.dom('*').hasText("import Application from '@ember/application';");
  });

  test('it renders a function import example', async function (assert) {
    await render(
      <template><ImportExample @item="{ uniqBy }" @package="@ember/object/computed" /></template>
    );
    assert.dom('*').hasText("import { uniqBy } from '@ember/object/computed';");
  });
});
