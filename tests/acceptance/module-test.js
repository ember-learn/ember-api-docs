import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll } from '@ember/test-helpers';

module('Acceptance | Module', function(hooks) {
  setupApplicationTest(hooks);

  test('lists all public/private classes and namespaces on the module page', async function(assert) {
    await visit('ember/1.0/modules/ember-handlebars');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-handlebars');

    let numberNameSpaces = Object.keys(container.get('namespaces')).length;
    let numberPublicClasses = Object.keys(container.get('publicclasses')).length;
    let numberPrivateClasses = Object.keys(container.get('privateclasses')).length;

    assert.equal(findAll('.spec-property-list li').length, numberPublicClasses + numberNameSpaces);

    await click('.sidebar .private-deprecated-toggle');
    assert.equal(findAll('.spec-property-list li').length, numberPublicClasses + numberNameSpaces + numberPrivateClasses);
  });

  test('lists all submodules on the module page', async function(assert) {
    await visit('ember/1.0/modules/ember');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember');

    let numberSubModules = Object.keys(container.get('submodules')).length;

    assert.equal(findAll('.spec-method-list li').length, numberSubModules);
  });

  test('display submodule parent', async function(assert) {
    await visit('ember/1.0/modules/ember-application');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-application');
    assert.dom(`.attribute-value`).hasText(container.get('parent'));
  });
});
