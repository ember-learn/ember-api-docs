import { test } from 'qunit';
import $ from 'jquery';
import { visit } from 'ember-native-dom-helpers';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | open graph tags', {
  beforeEach() {
    return visit('/ember/1.0/classes/Container');
  }
});

function findOpenGraphContent (propertyName) {
  const el = $(`meta[property="og:${propertyName}"]`);
  return el.attr('content');
}

test('assigns title property', function (assert) {
  const title = findOpenGraphContent('title');
  assert.equal(title, 'Container - 1.0 - Ember API Documentation');
});
