import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click } from '@ember/test-helpers';

module('Acceptance | method inheritance', function(hooks) {
  setupApplicationTest(hooks);

  test('no duplicate methods displayed', async function (assert) {
    await visit('/ember-data/2.13/classes/DS.JSONAPIAdapter');
    assert.dom("[data-test-item='createRecord']").exists({ count: 1 });
  });

  test('most local inherited method is shown', async function (assert) {
    await visit('/ember-data/2.13/classes/DS.JSONAPIAdapter');
    await click(`${'[data-test-item="createRecord"]'} a`)
    assert.dom("[data-test-file='addon/adapters/rest.js']").exists();
  });
});
