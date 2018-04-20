import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | document title', function(hooks) {
  setupApplicationTest(hooks);

  test('is of format className - version - Ember API Docs', async function(assert) {
    await visit('/ember/1.0/classes/Container');
    assert.equal(document.title, 'Container - 1.0 - Ember API Documentation');
  });
});
