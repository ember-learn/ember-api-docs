import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  visit,
  click,
  findAll,
  find,
  currentURL,
  settled
} from '@ember/test-helpers';
import { selectSearch } from 'ember-power-select/test-support';
import { timeout } from 'ember-concurrency';

async function waitForSettled() {
  await settled();
  await timeout(10);
  await settled();
}

async function ensureVersionsExist(assert) {
  await waitForSettled();
  await selectSearch('.select-container', '2');
  await settled();

  assert.dom('.ember-power-select-options').exists({ count: 1 });
  assert.ok(findAll('.ember-power-select-options')[0].children.length > 1);
}

module('Acceptance | Switch Project', function(hooks) {
  setupApplicationTest(hooks);

  test('Can switch projects back and forth', async function(assert) {

    await visit('/');

    await click('.spec-ember-data');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember-data')).hasClass('active');

    await click('.spec-ember');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember')).hasClass('active');

    await click('.spec-ember-data');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember-data')).hasClass('active');
  });

  test('Can open class after switching projects back and forth', async function(assert) {
    await visit('/');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember')).hasClass('active');

    await click('.spec-ember-data');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember-data')).hasClass('active');

    await click('.spec-ember');
    await ensureVersionsExist(assert);
    assert.dom(find('.spec-ember')).hasClass('active');

    await click('[data-test-class=EmberObject] > a');
    await waitForSettled();
    assert.equal(currentURL(), '/ember/release/classes/EmberObject');
  });
});
