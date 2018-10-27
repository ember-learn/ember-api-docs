import { projectNameFromClassName } from 'ember-api-docs/helpers/project-name-from-class-name';
import { module, test } from 'qunit';

module('Unit | Helper | project name from class name');

test('it should find ember project name', function(assert) {
  const result = projectNameFromClassName(['Ember.SomeClass', 'fallback']);
    console.log(result);
  assert.equal(result, 'ember');
});

test('it should find ember-data project name', function(assert) {
  const result = projectNameFromClassName(['DS.SomeClass', 'fallback']);
  assert.equal(result, 'ember-data');
});

test('it should find fallback project name', function(assert) {
  const result = projectNameFromClassName(['Other.SomeClass', 'fallback']);
  assert.equal(result, 'fallback');
});
