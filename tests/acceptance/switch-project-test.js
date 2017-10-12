import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { skip } from 'qunit';
import {
  visit,
  click,
  findAll,
  findWithAssert
} from 'ember-native-dom-helpers';
import $ from 'jquery';

moduleForAcceptance('Acceptance | Switch Project');

skip('Can switch projects back and forth', async function(assert) {
  async function ensureVersionsExist() {
    await selectSearch('.select-container', '2');

    assert.dom('.ember-power-select-options').exists({ count: 1 });
    assert.ok(findAll('.ember-power-select-options')[0].children.length > 1);
  }

  await visit('/');

  await click('.spec-ember-data');
  await ensureVersionsExist();
  assert.ok($(findWithAssert('.spec-ember-data')).hasClass('active'));

  await click('.spec-ember');
  await ensureVersionsExist();
  assert.ok($(findWithAssert('.spec-ember')).hasClass('active'));

  await click('.spec-ember-data');
  await ensureVersionsExist();
  assert.ok($(findWithAssert('.spec-ember-data')).hasClass('active'));
});
