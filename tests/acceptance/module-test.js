/* eslint-disable qunit/no-assert-equal */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll } from '@ember/test-helpers';

module('Acceptance | Module', function (hooks) {
  setupApplicationTest(hooks);

  test('lists all public/private classes and namespaces on the module page', async function (assert) {
    await visit('ember/1.0/modules/ember-handlebars');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord(
      'module',
      'ember-1.0.0-ember-handlebars',
    );

    let numberNameSpaces = Object.keys(container.get('namespaces')).length;
    let numberPublicClasses = Object.keys(
      container.get('publicclasses'),
    ).length;
    let numberPrivateClasses = Object.keys(
      container.get('privateclasses'),
    ).length;

    assert.equal(
      findAll('.spec-property-list li').length,
      numberPublicClasses + numberNameSpaces,
    );

    await click('[data-test-private-deprecated-toggle]');
    assert.equal(
      findAll('.spec-property-list li').length,
      numberPublicClasses + numberNameSpaces + numberPrivateClasses,
    );
  });

  test('lists all submodules on the module page', async function (assert) {
    await visit('ember/1.0/modules/ember');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember');

    let numberSubModules = Object.keys(container.get('submodules')).length;

    assert.equal(findAll('.spec-method-list li').length, numberSubModules);
  });

  test('does not show the empty-module warning when the module has submodules', async function (assert) {
    await visit('ember/1.0/modules/ember');

    assert
      .dom('[data-test-empty-module-warning]')
      .doesNotExist('no warning when module has submodules');
  });

  test('does not show the empty-module warning when the module has public classes or namespaces', async function (assert) {
    await visit('ember/1.0/modules/ember-handlebars');

    assert
      .dom('[data-test-empty-module-warning]')
      .doesNotExist('no warning when module has public classes');
  });

  test('does not show the empty-module warning when the module has public functions', async function (assert) {
    // ember/2.16/modules/jquery has only public static functions ($) and no classes, namespaces, or submodules
    await visit('ember/2.16/modules/jquery');

    assert
      .dom('[data-test-empty-module-warning]')
      .doesNotExist('no warning when module has public functions');
  });

  test('does not show the empty-module warning on the ember-data-overview page', async function (assert) {
    // ember-data-overview has no content at all, but is excluded from the warning by name
    await visit('ember-data/4.7/modules/ember-data-overview');

    assert
      .dom('[data-test-empty-module-warning]')
      .doesNotExist(
        'no warning on ember-data-overview regardless of empty content',
      );
  });

  test('shows a note when all content is hidden by the private/deprecated filter', async function (assert) {
    // ember-htmlbars in 1.13 has only a private class (HandlebarsCompatibleHelper)
    // and no public classes, namespaces, submodules, or functions
    await visit('ember/1.13/modules/ember-htmlbars');

    assert
      .dom('[data-test-empty-module-warning]')
      .exists('warning shown when no public content is visible');

    await click('[data-test-private-deprecated-toggle]');

    assert
      .dom('[data-test-empty-module-warning]')
      .doesNotExist('warning hidden after showing private/deprecated content');
  });

  test('display submodule parent', async function (assert) {
    await visit('ember/1.0/modules/ember-application');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord(
      'module',
      'ember-1.0.0-ember-application',
    );
    assert.dom(`.attribute-value`).hasText(container.get('parent'));
  });
});
