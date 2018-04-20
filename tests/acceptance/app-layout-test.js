import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from 'ember-native-dom-helpers';

module('Acceptance | Application Layout', function(hooks) {
  setupApplicationTest(hooks);

  test('lists the project versions in a select box', async function(assert) {
    await visit('/ember/1.0/classes/Ember.Component');

    await selectSearch('.select-container', '2');

    assert.dom('.ember-power-select-options').exists({ count: 1 });
    assert.ok(find('.ember-power-select-options')[0].children.length > 1);
  });
});
