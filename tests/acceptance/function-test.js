import { visit, find, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Function', function(hooks) {
  setupApplicationTest(hooks);

  test('shows function when loaded from url', async function(assert) {
    await visit('ember/2.18/functions/@ember%2Fapplication/getOwner');

    assert.equal(findAll('.method').length, 1, 'Single function per page');
    assert.equal(find('.method .method-name').innerText, 'getOwner', 'Correct function is shown');
  });
});
