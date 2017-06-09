import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

function currentURLNoParams() {
  return currentURL().replace(/\?.*$/, '');
}

moduleForAcceptance('Acceptance | tab navigation');

test('switching tabs', async function(assert) {
  await visit('/ember/1.0.0/classes/Ember.Component');
  await click('.access-checkbox:contains(Inherited)');
  await click('.tabbed-layout__menu li:contains(Methods)');

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/methods', 'navigated to methods');
  assert.ok(find('.tabbed-layout__menu li:contains(Methods)').hasClass('tabbed-layout__menu__item_selected'), 'methods tab selected');

  await click('.tabbed-layout__menu li:contains(Properties)');

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/properties', 'navigated to properties');
  assert.ok(find('.tabbed-layout__menu li:contains(Properties)').hasClass('tabbed-layout__menu__item_selected'), 'properties tab selected');

  await click('.tabbed-layout__menu li:contains(Events)');

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component/events', 'navigated to events');
  assert.ok(find('.tabbed-layout__menu li:contains(Events)').hasClass('tabbed-layout__menu__item_selected'), 'events tab selected');

  await click('.tabbed-layout__menu li:contains(Index)');

  assert.equal(currentURLNoParams(), '/ember/1.0.0/classes/Ember.Component', 'navigated to index');
  assert.ok(find('.tabbed-layout__menu li:contains(Index)').hasClass('tabbed-layout__menu__item_selected'), 'index tab selected');
});
