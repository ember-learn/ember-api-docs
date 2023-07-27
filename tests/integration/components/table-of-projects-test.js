import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table-of-projects', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<TableOfProjects />`);
    assert.dom(this.element).hasText('Home Projects Ember EmberData Ember CLI');
    // The functional test for this is in acceptance/switch-project-test.js
  });
});
