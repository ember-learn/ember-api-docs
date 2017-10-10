import { skip } from 'qunit';
import { visit } from 'ember-native-dom-helpers';
import { percySnapshot } from 'ember-percy';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | percy');

skip('Percy snapshot tests', async function(assert) {
  await visit('/');
  percySnapshot('Landing page');
  assert.ok(true);
});
