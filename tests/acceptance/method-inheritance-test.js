import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {skip} from 'qunit';
import { visit, click, findAll, findWithAssert } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | method inheritance')

skip('no duplicate methods displayed', async function (assert) {
  await visit('/ember-data/2.14/classes/DS.JSONAPIAdapter');
  assert.equal(findAll("[data-test-item='createRecord']").length, 1);
});

skip('most local inherited method is shown', async function (assert) {
  await visit('/ember-data/2.14/classes/DS.JSONAPIAdapter');
  await click(`${testSelector('item', 'createRecord')} a`)
  assert.ok(findWithAssert("[data-test-file='addon/adapters/rest.js']"));
});
