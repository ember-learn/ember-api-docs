import { test } from 'qunit';
import { visit, click, find } from 'ember-native-dom-helpers';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

function currentURLNoParams() {
  return currentURL().replace(/\?.*$/, '');
}

moduleForAcceptance('Acceptance | tab navigation');

test('switching tabs', async function(assert) {
  await visit('/ember/1.0/classes/Ember.Component');
  await click('[data-test-checkbox="inherited"]');
  await click(`.tabbed-layout__menu ${'[data-test-tab="methods"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component/methods', 'navigated to methods');
  assert.ok(find(`.tabbed-layout__menu ${'[data-test-tab="methods"]'}`).classList.contains('tabbed-layout__menu__item_selected'), 'methods tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="properties"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component/properties', 'navigated to properties');
  assert.ok(find(`.tabbed-layout__menu ${'[data-test-tab="properties"]'}`).classList.contains('tabbed-layout__menu__item_selected'), 'properties tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="events"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component/events', 'navigated to events');
  assert.ok(find(`.tabbed-layout__menu ${'[data-test-tab="events"]'}`).classList.contains('tabbed-layout__menu__item_selected'), 'events tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="index"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component', 'navigated to index');
  assert.ok(find(`.tabbed-layout__menu ${'[data-test-tab="index"]'}`).classList.contains('tabbed-layout__menu__item_selected'), 'index tab selected');
});
