import { test } from 'qunit';
import { visit } from 'ember-native-dom-helpers';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | document title');

test('is of format className - version - Ember API Docs', async function(assert) {
  await visit('/ember/1.0.0/classes/Container');
  assert.equal(document.title, 'Container - 1.0.0 - Ember API Documentation');
});

