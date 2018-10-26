import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit, click, findAll } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Creating Anchors');

test('Can create a link from the "Properties" tab', async function(assert) {
  await visit('/ember/1.0/classes/Container/properties');
  let [ element ] = findAll('.class-field-description--link');
  await click(element);
  assert.equal(currentURL(), `/ember/1.0/classes/Container/properties?anchor=${element.innerText}`);
});
