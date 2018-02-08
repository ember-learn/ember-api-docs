import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit, find, findAll } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Function');

test('shows function when loaded from url', async function (assert) {
  await visit('ember/2.18/functions/@ember%2Fapplication/getOwner');

  assert.equal(findAll('.method').length, 1, 'Single function per page');
  assert.equal(find('.method .method-name').innerText, 'getOwner', 'Correct function is shown');
})
