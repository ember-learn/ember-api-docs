import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, currentURL, settled } from '@ember/test-helpers';
import { timeout } from 'ember-concurrency';

module('Acceptance | link from ember data to ember test', function(hooks) {
  setupApplicationTest(hooks);

  test('extends link test', async function (assert) {
    await visit('/ember-data/3.14/classes/Errors');
    await click('[data-test-extends-link]');
    await settled();
    await timeout(10);
    await settled();
    assert.equal(currentURL(), '/ember/3.14/classes/ArrayProxy');
  });

  test('uses link test', async function (assert) {
    await visit('/ember-data/3.14/classes/Errors');
    await click('[data-test-uses-link]');
    await settled();
    await timeout(10);
    await settled();
    assert.equal(currentURL(), '/ember/3.14/classes/Evented');
  });
});
