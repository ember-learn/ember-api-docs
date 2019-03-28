import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import {
  visit,
  click,
  findAll,
  findWithAssert
} from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Switch Project');

test('Can switch projects back and forth', async function(assert) {
  async function ensureVersionsExist() {
    await selectSearch('.select-container', '2');

    assert.dom('.ember-power-select-options').exists({ count: 1 });
    assert.ok(findAll('.ember-power-select-options')[0].children.length > 1);
  }

  await visit('/');

  await click('.spec-ember-data');
  await ensureVersionsExist();
  assert.ok(findWithAssert('.spec-ember-data').classList.contains('active'));

  await click('.spec-ember');
  await ensureVersionsExist();
  assert.ok(findWithAssert('.spec-ember').classList.contains('active'));

  await click('.spec-ember-data');
  await ensureVersionsExist();
  assert.ok(findWithAssert('.spec-ember-data').classList.contains('active'));
});
