import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | release URL');

test('specifying release instead of specific version in URL should go to the latest release', async function (assert) {
  await visit('ember/release/classes/Application');
  assert.equal(find('h1.module-name').text().trim(), 'Application')
});
