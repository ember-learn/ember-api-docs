import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  visit,
  click,
  findAll,
  find,
  settled
} from '@ember/test-helpers';
import { selectSearch } from 'ember-power-select/test-support';
import { timeout } from 'ember-concurrency';

module('Acceptance | Switch Project', function(hooks) {
  setupApplicationTest(hooks);

  test('Can switch projects back and forth', async function(assert) {
    async function ensureVersionsExist() {
      await settled();
      await timeout(10);
      await settled();
      await selectSearch('.select-container', '2');
      await settled();

      assert.dom('.ember-power-select-options').exists({ count: 1 });
      assert.ok(findAll('.ember-power-select-options')[0].children.length > 1);
    }

    await visit('/');

    await click('.spec-ember-data');
    await ensureVersionsExist();
    assert.dom(find('.spec-ember-data')).hasClass('active');

    await click('.spec-ember');
    await ensureVersionsExist();
    assert.dom(find('.spec-ember')).hasClass('active');

    await click('.spec-ember-data');
    await ensureVersionsExist();
    assert.dom(find('.spec-ember-data')).hasClass('active');
  });
});
