import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import TableOfProjects from 'ember-api-docs/components/table-of-projects';

module('Integration | Component | table-of-projects', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><TableOfProjects /></template>);
    assert.dom(this.element).hasText('Home Projects Ember EmberData Ember CLI');
    // The functional test for this is in acceptance/switch-project-test.js
  });
});
