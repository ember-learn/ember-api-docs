/* eslint-disable qunit/require-expect */
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  findAll,
  find,
  triggerEvent,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | class field description', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('type', 'method');
    this.set(
      'field',
      EmberObject.create({
        access: 'public',
        deprecated: true,
        name: 'concat',
        description: 'concatenates',
        params: [{ name: 'param1' }, { name: 'param2' }, { name: 'param3' }],
      })
    );

    await render(
      hbs`<ClassFieldDescription @type={{this.type}} @field={{this.field}}/>`
    );

    assert.dom('.method-name').hasText('concat');
    assert.dom(findAll('.access')[0]).hasText('public');
    assert.dom(findAll('.access')[1]).hasText('deprecated');
    assert.dom(findAll('.args')[0]).hasText('(param1, param2, param3)');
  });

  test('On hover -- the link icon shows up', async function (assert) {
    this.set('type', 'method');
    this.set(
      'field',
      EmberObject.create({
        access: 'public',
        deprecated: true,
        name: 'concat',
        description: 'concatenates',
        params: [{ name: 'param1' }, { name: 'param2' }, { name: 'param3' }],
      })
    );

    await render(
      hbs`<ClassFieldDescription @type={{this.type}} @field={{this.field}}/>`
    );

    await triggerEvent('.class-field-description--link', 'mouseenter');
    assert
      .dom('.class-field-description--link-hover')
      .exists('The link icon appears when hovering on the method text');
  });

  test('it calls the provided action on link-click with the field name as an arg', async function (assert) {
    this.set('updateAnchor', (name) => {
      assert.equal(
        name,
        'field-name',
        'expected the field name to be passed into the action'
      );
      assert.step('updateAnchorAction');
    });

    this.set(
      'field',
      EmberObject.create({
        name: 'field-name',
      })
    );

    await render(
      hbs`<ClassFieldDescription @field={{this.field}} @updateAnchor={{this.updateAnchor}}/>`
    );

    await click('.class-field-description--link');

    assert.verifySteps(['updateAnchorAction']);
  });

  test('parameter props are displayed', async function (assert) {
    this.set('type', 'method');
    this.set(
      'field',
      EmberObject.create({
        access: 'public',
        deprecated: true,
        name: 'concat',
        description: 'concatenates',
        params: [
          { name: 'param1' },
          { name: 'param2' },
          { name: 'options', props: [{ name: 'prop1' }, { name: 'prop2' }] },
        ],
      })
    );

    await render(
      hbs`<ClassFieldDescription @type={{this.type}} @field={{this.field}}/>`
    );

    assert.dom(find('.prop:nth-child(1) dt')).hasText('prop1');
    assert.dom(find('.prop:nth-child(2) dt')).hasText('prop2');
  });
});
