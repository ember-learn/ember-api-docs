import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll, currentURL } from '@ember/test-helpers';

module('Acceptance | Creating Anchors', function(hooks) {
  setupApplicationTest(hooks);

  test('Can create a link from the "Properties" tab', async function(assert) {
    await visit('/ember/1.0/classes/Container/properties');
    let [ element ] = findAll('.class-field-description--link');
    await click(element);
    assert.equal(currentURL(), `/ember/1.0/classes/Container/properties?anchor=${element.innerText.trim()}`);
  });
});
