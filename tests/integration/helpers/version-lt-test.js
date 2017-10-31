
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('version-lt', 'helper:version-lt', {
  integration: true
});

test('should calculate major version diffs', function(assert) {
  this.render(hbs`{{version-lt '2.10' '3.0' 'ember'}}`);
  assert.equal(this.$().text().trim(), 'true');
});

test('should calculate minor version diffs', function (assert) {
  this.render(hbs`{{version-lt '2.15' '2.16' 'ember'}}`);
  assert.equal(this.$().text().trim(), 'true');
});

test('should fail if major greater', function (assert) {
  this.render(hbs`{{version-lt '3.0' '2.16' 'ember'}}`);
  assert.equal(this.$().text().trim(), 'false');
});

test('should fail if minor greater', function (assert) {
  this.render(hbs`{{version-lt '2.17' '2.16' 'ember'}}`);
  assert.equal(this.$().text().trim(), 'false');
})

test('should fail if equal', function (assert) {
  this.render(hbs`{{version-lt '2.16' '2.16' 'ember'}}`);
  assert.equal(this.$().text().trim(), 'false');
})

