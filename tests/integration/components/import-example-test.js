import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | import example', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a class import example', async function(assert) {
    await render(hbs`{{import-example item='Application' package='@ember/application'}}`);
    assert.equal(find('*').textContent.trim(), "import Application from '@ember/application';");
  });

  test('it renders a function import example', async function(assert) {
    await render(hbs`{{import-example item='{ uniqBy }' package='@ember/object/computed'}}`);
    assert.equal(find('*').textContent.trim(), "import { uniqBy } from '@ember/object/computed';");
  });
});
