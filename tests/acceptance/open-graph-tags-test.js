import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | open graph tags', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    return visit('/ember/1.0/classes/Container');
  });

  function findOpenGraphContent (propertyName) {
    const el = document.querySelector(`head meta[property="og:${propertyName}"]`);
    return el.content;
  }

  test('assigns title property', function (assert) {
    const title = findOpenGraphContent('title');
    assert.equal(title, 'Container - 1.0 - Ember API Documentation');
  });
});
