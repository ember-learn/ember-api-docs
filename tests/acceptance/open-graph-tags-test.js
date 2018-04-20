import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import $ from 'jquery';
import { visit } from 'ember-native-dom-helpers';

module('Acceptance | open graph tags', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    return await visit('/ember/1.0/classes/Container');
  });

  function findOpenGraphContent (propertyName) {
    const el = $(`meta[property="og:${propertyName}"]`);
    return el.attr('content');
  }

  test('assigns title property', function (assert) {
    const title = findOpenGraphContent('title');
    assert.equal(title, 'Container - 1.0 - Ember API Documentation');
  });

  test('assigns image property and width/height', function (assert) {
    const image = findOpenGraphContent('image');
    assert.equal(image, 'assets/images/ember-logo.png');

    const imageWidth = findOpenGraphContent('image:width');
    assert.equal(imageWidth, '1200');

    const imageHeight = findOpenGraphContent('image:height');
    assert.equal(imageHeight, '1016');
  });
});
