import { click,findAll, findWithAssert, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { selectSearch } from 'ember-power-select/test-support';

module('Acceptance | Switch Project', function(hooks) {
  setupApplicationTest(hooks);

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
});
