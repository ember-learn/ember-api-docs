/* eslint-disable qunit/no-assert-equal */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, find } from '@ember/test-helpers';

module('Acceptance | Function', function (hooks) {
  setupApplicationTest(hooks);

  test.skip('shows function when loaded from url', async function (assert) {
    await visit('ember/2.18/functions/@ember%2Fapplication/getOwner');

    assert.dom('.method').exists({ count: 1 }, 'Single function per page');
    assert.equal(
      find('.method .method-name').innerText,
      'getOwner',
      'Correct function is shown'
    );
  });

  test('shows function when loaded from url in a more modern version', async function (assert) {
    await visit('ember/3.28/functions/@ember%2Fapplication/getOwner');

    assert.dom('.method').exists({ count: 1 }, 'Single function per page');
    assert
      .dom('.method .method-name')
      .hasText('getOwner', 'Correct function is shown');
  });
});
