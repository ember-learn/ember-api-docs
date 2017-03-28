import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-input/dropdown-result', 'Integration | Component | search input/dropdown result', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search-input/dropdown-result}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-input/dropdown-result}}
      template block text
    {{/search-input/dropdown-result}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
