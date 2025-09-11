import { visit } from '@ember/test-helpers';
import { module, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | open graph tags', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    return visit('/ember/1.0/classes/Container');
  });

  function findOpenGraphContent(propertyName) {
    const el = document.querySelector(
      `head meta[property="og:${propertyName}"]`,
    );
    return el.content;
  }

  skip('assigns title property', function (assert) {
    // TODO find a better way to update the og:title using ember-page-title

    const title = findOpenGraphContent('title');
    assert.equal(title, 'Container | 1.0.0 | Ember API Documentation');
  });
});
