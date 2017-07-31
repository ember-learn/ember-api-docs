import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('class-field-description', 'Integration | Component | class field description', {
  integration: true
});

test('it renders', function(assert) {
  this.set('type', 'method');
  this.set('field', EmberObject.create({
    access: "public",
    deprecated: true,
    name: "concat",
    description: "concatenates",
    params: [{name: 'param1'}, {name: 'param2'}, {name: 'param3'}]
  }));

  this.render(hbs`{{class-field-description type=type field=field}}`);

  assert.equal(find('.method-name').textContent.trim(), 'concat');
  assert.equal(findAll('.access')[0].textContent.trim(), 'public');
  assert.equal(findAll('.access')[1].textContent.trim(), 'deprecated');
  assert.equal(findAll('.args')[0].textContent.trim(), '(param1, param2, param3)');
});


test('On hover -- the link icon shows up', async function(assert) {
  this.set('type', 'method');
  this.set('field', EmberObject.create({
    access: "public",
    deprecated: true,
    name: "concat",
    description: "concatenates",
    params: [{name: 'param1'}, {name: 'param2'}, {name: 'param3'}]
  }));

  this.render(hbs`{{class-field-description type=type field=field}}`);

  await triggerEvent('.class-field-description--link', 'mouseenter');
  assert.ok(find('.class-field-description--link-hover'), 'The link icon appears when hovering on the method text');
});
