import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Module');

test('lists all public/private classes and namespaces on the package page', async function(assert) {
  await visit('ember/1.0/packages/ember-handlebars');

  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('module', 'ember-1.0.0-ember-handlebars');

  let numberNameSpaces = Object.keys(container.get('namespaces')).length;
  let numberPublicClasses = Object.keys(container.get('publicclasses')).length;
  let numberPrivateClasses = Object.keys(container.get('privateclasses')).length;

  assert.equal(find('.spec-property-list li').length, numberPublicClasses + numberNameSpaces);

  await click('.sidebar .private-deprecated-toggle');
  assert.equal(find('.spec-property-list li').length, numberPublicClasses + numberNameSpaces + numberPrivateClasses);
});

test('lists all subpackages on the package page', async function(assert) {
  await visit('ember/1.0/packages/ember');
  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('module', 'ember-1.0.0-ember');

  let numberSubModules = Object.keys(container.get('submodule')).length;
  assert.equal(find('.spec-method-list li').length, numberSubModules);
});

test('display subpackage parent', async function(assert) {
  await visit('ember/1.0/packages/ember-application');

  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('module', 'ember-1.0.0-ember-application');

  assert.ok(find(`.attribute-value:contains(${container.get('parent')})`).length);
});

// redirect /modules to /packages*
