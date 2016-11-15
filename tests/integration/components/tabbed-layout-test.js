import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
  assert.ok(this.$('#tab-item-index').is(':visible'), 'should render index page visible');
});

test('should initially render all tabs', function (assert) {

  this.render(hbs`
    {{#tabbed-layout selectedTab=\"index\" as |select selectedTab|}}
      <ul class=\"menu\">
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"index\"}}>Index</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"methods\"}}>Methods</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"properties\"}}>Properties</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"events\"}}>Events</a>
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

test('should swtich displayed page when tab clicked', function (assert) {
  this.render(hbs`
    {{#tabbed-layout selectedTab=\"index\" as |select selectedTab|}}
      <ul class=\"menu\">
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"index\"}}>Index</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"methods\"}}>Methods</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"properties\"}}>Properties</a>
        </li>
        <li class=\"menu-item\">
          <a href=\"#\" {{action select \"events\"}}>Events</a>
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
  this.$('.menu>.menu-item>a')[1].click();
  assert.equal(this.$('#tab-item-methods').text().trim(), 'methods', 'should display methods page');
  assert.ok(this.$('#tab-item-methods').is(':visible'), 'methods page is visible');
  assert.ok(!this.$('#tab-item-index').is(':visible'), 'index page is not visible');

});
