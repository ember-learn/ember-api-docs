import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | Module');

test('lists all public/private classes and namespaces on the module page', function(assert) {

  visit('ember/1.0.0/modules/ember-handlebars');

  andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-handlebars');

    let numberNameSpaces = Object.keys(container.get('namespaces')).length;
    let numberPublicClasses = Object.keys(container.get('publicclasses')).length;
    let numberPrivateClasses = Object.keys(container.get('privateclasses')).length;

    assert.equal(find('.spec-property-list li').length, numberPublicClasses + numberNameSpaces);

    click('.sidebar .private-deprecated-toggle');
    andThen(() => {
      assert.equal(find('.spec-property-list li').length, numberPublicClasses + numberNameSpaces + numberPrivateClasses);
    });
  });

});

test('lists all submodules on the module page', function(assert) {

  visit('ember/1.0.0/modules/ember');

  andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember');

    let numberSubModules = Object.keys(container.get('submodules')).length;

    assert.equal(find('.spec-method-list li').length, numberSubModules);
  });

});

test('display submodule parent', function(assert) {

  visit('ember/1.0.0/modules/ember-application');

  andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-application');

    assert.ok(find(`.attribute-value:contains(${container.get('parent')})`).length);
  });
});
