import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import ClassFieldDescription from 'ember-api-docs/components/class-field-description';

module('Integration | Component | class field description', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const type = 'method';
    const field = {
      access: 'public',
      deprecated: true,
      name: 'concat',
      description: 'concatenates',
      params: [{ name: 'param1' }, { name: 'param2' }, { name: 'param3' }],
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom('.method-name').hasText('concat');
    assert.dom(findAll('.access')[0]).hasText('public');
    assert.dom(findAll('.access')[1]).hasText('deprecated');
    assert.dom(findAll('.args')[0]).hasText('param1, param2, param3');
  });

  test('shows module link from field.module', async function (assert) {
    const type = 'method';
    const field = {
      name: 'myMethod',
      module: '@ember/component',
    };
    const model = {
      projectVersion: { compactVersion: '6.0' },
      project: { id: 'ember' },
    };

    await render(
      <template>
        <ClassFieldDescription
          @type={{type}}
          @field={{field}}
          @model={{model}}
        />
      </template>,
    );

    assert.dom('[data-test-module]').hasText('@ember/component');
  });

  test('parameter props are displayed', async function (assert) {
    const type = 'method';
    const field = {
      access: 'public',
      deprecated: true,
      name: 'concat',
      description: 'concatenates',
      params: [
        { name: 'param1' },
        { name: 'param2' },
        { name: 'options', props: [{ name: 'prop1' }, { name: 'prop2' }] },
      ],
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom(find('.prop:nth-child(1) dt')).hasText('prop1');
    assert.dom(find('.prop:nth-child(2) dt')).hasText('prop2');
  });
});
