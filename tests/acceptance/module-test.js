import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | Module');

test('lists all classes and namespaces on the module page', function(assert) {

  visit('ember/1.0.0/modules/ember-application');

  andThen(() => {
    const store = this.application.__container__.lookup('service:store');
    const container = store.peekRecord('module', 'ember-1.0.0-ember-application');

    let numberNameSpaces = Object.keys(container.get('namespaces')).length;
    let numberClasses = Object.keys(container.get('classes')).length;

    assert.equal(find('.spec-property-list li').length, numberClasses + numberNameSpaces);
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
