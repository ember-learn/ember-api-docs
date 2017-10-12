import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Application Layout');

test('lists the project versions in a select box', async function(assert) {
  await visit('/ember/1.0/classes/Ember.Component');

  await selectSearch('.select-container', '2');

  assert.dom('.ember-power-select-options').exists({ count: 1 });
  assert.ok(find('.ember-power-select-options')[0].children.length > 1);
});
