import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('remove-ember-prefix', 'helper:remove-ember-prefix', {
  integration: true
});


test('it doesn\'t remove DS prefix', function(assert) {
  this.set('inputValue', 'DS.Error');

  this.render(hbs`{{remove-ember-prefix inputValue}}`);

  assert.equal(this.$().text().trim(), 'DS.Error');
});

test('it does remove `Ember.` prefix ', function(assert) {
  this.set('inputValue', 'Ember.ArrayProxy');

  this.render(hbs`{{remove-ember-prefix inputValue}}`);

  assert.equal(this.$().text().trim(), 'ArrayProxy');
});

test('it doesn\'t remove `Ember` prefix', function(assert) {
  this.set('inputValue', 'EmberArray');

  this.render(hbs`{{remove-ember-prefix inputValue}}`);

  assert.equal(this.$().text().trim(), 'EmberArray');
});