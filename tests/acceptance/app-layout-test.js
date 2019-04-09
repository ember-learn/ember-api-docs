import { findAll, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { selectSearch } from 'ember-power-select/test-support';

module('Acceptance | Application Layout', function(hooks) {
  setupApplicationTest(hooks);

  test('lists the project versions in a select box', async function(assert) {
    await visit('/ember/1.0/classes/Ember.Component');

    await selectSearch('.select-container', '2');

    assert.dom('.ember-power-select-options').exists({ count: 1 });
    assert.ok(findAll('.ember-power-select-options')[0].children.length > 1);
  });
});
