import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Function', function(hooks) {
  setupApplicationTest(hooks);

  test('shows function when loaded from url', async function(assert) {
    await visit('ember/2.18/functions/@ember%2Fapplication/getOwner');

    assert.dom('.method').exists({ count: 1 });
    assert.dom('.method .method-name').hasText('getOwner');
  });
});
