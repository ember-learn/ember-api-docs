import { test } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';
import $ from 'jquery';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

function currentURLNoParams() {
  return currentURL().replace(/\?.*$/, '');
}

moduleForAcceptance('Acceptance | tab navigation');

test('switching tabs', async function(assert) {
  await visit('/ember/1.0.0/classes/Ember.Component');
  await click($('.access-checkbox:contains(Inherited)')[0]);
  await click($('.tabbed-layout__menu li:contains(Methods)')[0]);

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/methods', 'navigated to methods');
  assert.ok($('.tabbed-layout__menu li:contains(Methods)').hasClass('tabbed-layout__menu__item_selected'), 'methods tab selected');

  await click($('.tabbed-layout__menu li:contains(Properties)')[0]);

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/properties', 'navigated to properties');
  assert.ok($('.tabbed-layout__menu li:contains(Properties)').hasClass('tabbed-layout__menu__item_selected'), 'properties tab selected');

  await click($('.tabbed-layout__menu li:contains(Events)')[0]);

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/events', 'navigated to events');
  assert.ok($('.tabbed-layout__menu li:contains(Events)').hasClass('tabbed-layout__menu__item_selected'), 'events tab selected');

  await click($('.tabbed-layout__menu li:contains(Index)')[0]);

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component', 'navigated to index');
  assert.ok($('.tabbed-layout__menu li:contains(Index)').hasClass('tabbed-layout__menu__item_selected'), 'index tab selected');
});
