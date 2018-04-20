import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from 'ember-native-dom-helpers';
import { percySnapshot } from 'ember-percy';

module('Acceptance | percy', function(hooks) {
  setupApplicationTest(hooks);

  test('Percy snapshot tests', async function(assert) {
    await visit('/');
    percySnapshot('Landing page');
    assert.ok(true);
  });
});
