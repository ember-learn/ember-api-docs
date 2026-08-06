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

  test('shows import example for static method on @-scoped package', async function (assert) {
    const type = 'method';
    const field = {
      name: 'hash',
      static: 1,
      itemtype: 'method',
      class: '@ember/helper',
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom('*').containsText("import { hash } from '@ember/helper';");
  });

  test('shows import example for static method on rsvp', async function (assert) {
    const type = 'method';
    const field = {
      name: 'all',
      static: 1,
      itemtype: 'method',
      class: 'rsvp',
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom('*').containsText("import { all } from 'rsvp';");
  });

  test('does not show import example when noimport flag exists', async function (assert) {
    const type = 'method';
    const field = {
      name: 'hash',
      static: 1,
      itemtype: 'method',
      class: '@ember/helper',
      noimport: '',
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom('pre code').doesNotExist();
  });

  test('does not show import example for non-importable package', async function (assert) {
    const type = 'method';
    const field = {
      name: 'someMethod',
      static: 1,
      itemtype: 'method',
      class: 'SomeInternalClass',
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert.dom('pre code').doesNotExist();
  });

  test('shows import example when field has exampleimport override', async function (assert) {
    const type = 'method';
    const field = {
      name: 'myMethod',
      exampleimport: "import { myMethod } from 'some-package/internal';",
      class: 'SomeInternalClass',
    };

    await render(
      <template>
        <ClassFieldDescription @type={{type}} @field={{field}} />
      </template>,
    );

    assert
      .dom('*')
      .containsText("import { myMethod } from 'some-package/internal';");
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
