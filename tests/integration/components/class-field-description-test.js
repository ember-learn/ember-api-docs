import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, findAll, triggerEvent } from 'ember-native-dom-helpers';

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

  assert.dom('.method-name').hasText('concat');
  assert.dom(findAll('.access')[0]).hasText('public');
  assert.dom(findAll('.access')[1]).hasText('deprecated');
  assert.dom(findAll('.args')[0]).hasText('(param1, param2, param3)');
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
  assert.dom('.class-field-description--link-hover').exists('The link icon appears when hovering on the method text');
});

test('it calls the provided action on link-click with the field name as an arg', async function(assert) {
  this.set('updateAnchor', (name) => {
    assert.equal(name, 'field-name', 'expected the field name to be passed into the action');
    assert.step('updateAnchorAction');
  });

  this.set('field', EmberObject.create({
    name: "field-name",
  }));

  this.render(hbs`{{class-field-description field=field updateAnchor=updateAnchor}}`);

  await click('.class-field-description--link');

  assert.verifySteps([
    'updateAnchorAction'
  ]);
});
