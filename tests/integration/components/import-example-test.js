import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('import-example', 'Integration | Component | import example', {
  integration: true
});

test('it renders a class import example', function(assert) {
  this.render(hbs`{{import-example item='Application' package='@ember/application'}}`);
  assert.equal(this.$().text().trim(), "import Application from '@ember/application';");
});

test('it renders a function import example', function (assert) {
  this.render(hbs`{{import-example item='{ uniqBy }' package='@ember/object/computed'}}`);
  assert.equal(this.$().text().trim(), "import { uniqBy } from '@ember/object/computed';");
});
