import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';
import { visit, click } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Package');

test('lists all public/private classes and namespaces on the package page', async function(assert) {
  await visit('ember/1.0/packages/ember-handlebars');

  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('package', 'ember-1.0.0-ember-handlebars');

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
  const container = store.peekRecord('package', 'ember-1.0.0-ember');

  let numberSubPackages = Object.keys(container.get('subpackages')).length;

  assert.equal(find('.spec-method-list li').length, numberSubPackages);
});

test('display subpackage parent', async function(assert) {
  await visit('ember/1.0/packages/ember-application');

  const store = this.application.__container__.lookup('service:store');
  const container = store.peekRecord('package', 'ember-1.0.0-ember-application');

  assert.ok(find(`.attribute-value:contains(${container.get('parent')})`).length);
});
