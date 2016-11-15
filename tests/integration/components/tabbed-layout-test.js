import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('tabbed-layout', 'Integration | Component | tabbed layout', {
  integration: true
});

test('should initially render first tab selected', function (assert) {

  this.render(hbs`
    {{#tabbed-layout selectedTab=\"index\" as |select selectedTab|}}
      <ul>
        <li>
          <a href=\"#\" {{action \"select\" \"index\"}}>Index</a>
        </li>
        <li>
          <a href=\"#\" {{action \"select\" \"methods\"}}>Methods</a>
        </li>
        <li>
          <a href=\"#\" {{action \"select\" \"properties\"}}>Properties</a>
        </li>
        <li>
          <a href=\"#\" {{action \"select\" \"events\"}}>Events</a>
        </li>
      </ul>
      {{#tab-item name=\"index\" selectedTab=selectedTab}}
        index
      {{/tab-item}}
      {{#tab-item name=\"properties\" selectedTab=selectedTab}}
        properties
      {{/tab-item}}
      {{#tab-item name=\"methods\" selectedTab=selectedTab}}
        methods
      {{/tab-item}}
      {{#tab-item name=\"events\" selectedTab=selectedTab}}
        events
      {{/tab-item}}
    {{/tabbed-layout}}
  `);
  assert.equal(this.$('#tab-item-index').text().trim(), 'index', 'should display index page');
});

test('should initially render all tabs', function (assert) {

  this.render(hbs`
    {{#tabbed-layout selectedTab=\"index\" as |select selectedTab|}}
      <ul class=\"menu\">
        <li class=\"menu-item\">
          <a href=\"#\" {{action \"select\" \"index\"}}>Index</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action \"select\" \"methods\"}}>Methods</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action \"select\" \"properties\"}}>Properties</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action \"select\" \"events\"}}>Events</a>
        </li>
      </ul>
      {{#tab-item name=\"index\" selectedTab=selectedTab}}
        index
      {{/tab-item}}
      {{#tab-item name=\"properties\" selectedTab=selectedTab}}
        properties
      {{/tab-item}}
      {{#tab-item name=\"methods\" selectedTab=selectedTab}}
        methods
      {{/tab-item}}
      {{#tab-item name=\"events\" selectedTab=selectedTab}}
        events
      {{/tab-item}}
    {{/tabbed-layout}}
  `);
  assert.equal(this.$('.menu>.menu-item').length, 4, 'should have 4 menu items');

});

// test('it renders', function(assert) {
//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });

//   this.render(hbs`{{tabbed-layout}}`);

//   assert.equal(this.$().text().trim(), '');

//   // Template block usage:
//   this.render(hbs`
//     {{#tabbed-layout}}
//       template block text
//     {{/tabbed-layout}}
//   `);

//   assert.equal(this.$().text().trim(), 'template block text');
// });
