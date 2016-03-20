import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | document title');

test('is of format className - version - Ember API Docs', function (assert) {
  return visit('/ember/1.0.0/classes/Container').then(() => {
    assert.equal(document.title, 'Container - 1.0.0 - Ember API Documentation');
  });
});

