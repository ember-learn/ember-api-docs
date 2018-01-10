import { test } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';
import $ from 'jquery';

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
  assert.ok($(`.tabbed-layout__menu ${'[data-test-tab="methods"]'}`).hasClass('tabbed-layout__menu__item_selected'), 'methods tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="properties"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component/properties', 'navigated to properties');
  assert.ok($(`.tabbed-layout__menu ${'[data-test-tab="properties"]'}`).hasClass('tabbed-layout__menu__item_selected'), 'properties tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="events"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component/events', 'navigated to events');
  assert.ok($(`.tabbed-layout__menu ${'[data-test-tab="events"]'}`).hasClass('tabbed-layout__menu__item_selected'), 'events tab selected');

  await click(`.tabbed-layout__menu ${'[data-test-tab="index"]'}`);

  assert.equal(currentURLNoParams(), '/ember/1.0/classes/Ember.Component', 'navigated to index');
  assert.ok($(`.tabbed-layout__menu ${'[data-test-tab="index"]'}`).hasClass('tabbed-layout__menu__item_selected'), 'index tab selected');
});
