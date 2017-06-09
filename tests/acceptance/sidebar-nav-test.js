import { test } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';
import $ from 'jquery';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sidebar navigation');

test('can navigate to namespace from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click($('.toc-level-1.namespaces a:contains(Ember.String)')[0]);

  assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember.String', 'navigated to namespace');
});

test('can navigate to module from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click($('.toc-level-1.modules a:contains(ember-application)')[0]);

  assert.equal(currentURL(), '/ember/1.0.0/modules/ember-application', 'navigated to module');
});

test('can navigate to class from sidebar', async function(assert) {
  await visit('/ember/1.0.0');
  await click($('.toc-level-1.classes a:contains(Ember.Component)')[0]);

  assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to class');
});
