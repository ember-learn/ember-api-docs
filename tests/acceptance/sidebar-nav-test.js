import { skip } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sidebar navigation');

skip('can navigate to namespace from sidebar', async function(assert) {
  await visit('/ember/1.0');
  await click(`${testSelector('namespace', 'Ember.String')} a`);

  assert.equal(currentURL(), '/ember/1.0/namespaces/Ember.String', 'navigated to namespace');
});

skip('can navigate to module from sidebar', async function(assert) {
  await visit('/ember/1.0');
  await click(`${testSelector('module', 'ember-application')} a`);

  assert.equal(currentURL(), '/ember/1.0/modules/ember-application', 'navigated to module');
});

skip('can navigate to class from sidebar', async function(assert) {
  await visit('/ember/1.0');
  await click(`${testSelector('class', 'Ember.Component')} a`);

  assert.equal(currentURL(), '/ember/1.0/classes/Ember.Component', 'navigated to class');
});
