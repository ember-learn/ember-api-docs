import { hashToUrl, hasRedirectableHash } from 'ember-api-docs/utils/hash-to-url';
import { module, test } from 'qunit';

module('Unit | Utility | hash to url', function() {
  const namespacePathname = '/ember/2.12.0/namespaces/Ember';
  const classPathname = '/ember/2.12.0/classes/Ember.CoreObject';
  const componentClassPathname = 'ember/2.12.0/classes/Ember.Component';

  test('should parse hash into object for a namespace', function (assert) {
    let result = hashToUrl({ location: { hash: '#method_isEmpty', pathname: namespacePathname }});
    assert.equal(result, `${namespacePathname}/methods/isEmpty?anchor=isEmpty`, 'should convert hash into path');
  });

  test('should parse hash into object for a class', function (assert) {
    let result = hashToUrl({ location: { hash: '#method_create', pathname: classPathname }});
    assert.equal(result, `${classPathname}/methods/create?anchor=create`, 'should convert hash into path');
  });

  test('should parse properties hash into object for a class', function (assert) {
    let result = hashToUrl({ location: { hash: '#property_isDestroying', pathname: classPathname }});
    assert.equal(result, `${classPathname}/properties/isDestroying?anchor=isDestroying`, `converted ${result} should match expected path`);
  });

  test('should parse events hash into object for a class', function (assert) {
    let result = hashToUrl({ location: { hash: '#event_didRender', pathname: componentClassPathname }});
    assert.equal(result, `${componentClassPathname}/events/didRender?anchor=didRender`, `converted ${result} should match expected path`);
  });

  test('should return false for hash without type', function (assert) {
    assert.ok(!hasRedirectableHash({ location: { hash: '#isEmpty'}}), '#isEmpty should be an invalid hash since its missing a type');
  });

  test('should return false for a hash with more than 1 seperator', function (assert) {
    assert.ok(!hasRedirectableHash({ location: { hash: '#method_isEmpty_today'}}), '#method_isEmpty_today should be invalid because of having 3 seperated sections');
  });

  test('should return false if no window', function (assert) {
    assert.ok(!hasRedirectableHash(null), 'should return false because no window obj');
  });

  test('should return false if no location', function (assert) {
    assert.ok(!hasRedirectableHash({}), 'should return false because no location obj');
  });

  test('should return false if no hash', function (assert) {
    assert.ok(!hasRedirectableHash({ location: {}}), 'should return false because no hash');
  });
});