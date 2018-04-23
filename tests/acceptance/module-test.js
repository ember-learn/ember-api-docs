import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Module', function(hooks) {
  setupApplicationTest(hooks);

  test('lists all public/private classes and namespaces on the module page', async function(assert) {
    await visit('/ember/1.0/modules/ember-handlebars');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-handlebars');

    let numberNameSpaces = Object.keys(container.get('namespaces')).length;
    let numberPublicClasses = Object.keys(container.get('publicclasses')).length;
    let numberPrivateClasses = Object.keys(container.get('privateclasses')).length;

    let count = numberPublicClasses + numberNameSpaces;

    assert.dom('.spec-property-list li').exists({ count });

    await click('.sidebar .private-deprecated-toggle');

    count += numberPrivateClasses;

    assert.dom('.spec-property-list li').exists({ count });
  });

  test('lists all submodules on the module page', async function(assert) {
    await visit('/ember/1.0/modules/ember');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember');

    let count = Object.keys(container.get('submodules')).length;

    assert.dom('.spec-method-list li').exists({ count });
  });

  test('display submodule parent', async function(assert) {
    await visit('/ember/1.0/modules/ember-application');

    const store = this.owner.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-application');

    assert.dom('.attribute-value').includesText(container.get('parent'));
  });
});
