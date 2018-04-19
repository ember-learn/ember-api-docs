
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('function-heading-id', 'helper:function-heading-id', {
  integration: true
});

test('should transform nested package to id', function(assert) {
  this.set('inputValue', '@ember/object/computed');

  this.render(hbs`{{function-heading-id inputValue}}`);

  assert.equal(this.$().text().trim(), 'functions-computed');
});
