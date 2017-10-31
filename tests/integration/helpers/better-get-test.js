
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('better-get', 'helper:better-get', {
  integration: true
});

// Replace this with your real tests.
test('should get dot separated', function(assert) {
  let obj = {
    'Ember.Object': 'hello'
  };
  this.set('dataStructure', obj);
  this.set('key', 'Ember.Object');

  this.render(hbs`{{better-get dataStructure key}}`);

  assert.equal(this.$().text().trim(), 'hello');
});

test('should get rfc 176 module', function (assert) {
  let obj = {
    '@ember/object': 'hello'
  };
  this.set('dataStructure', obj);
  this.set('key', '@ember/object');

  this.render(hbs`{{better-get dataStructure key}}`);

  assert.equal(this.$().text().trim(), 'hello');
});

