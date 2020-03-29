import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { A } from '@ember/array';
import { module, test } from 'qunit';

module('Unit | Utility | get full version', function() {
  test('should return full version when release', function(assert) {
    let projectObj = {
      availableVersions: A([{ id: 'ember-2.17.1' }, { id: 'ember-2.16.1' }])
    };

    let result = getFullVersion(projectObj, 'release');
    assert.equal(result, '2.17.1');
  });

  test('should return full version', function(assert) {
    let projectObj = {
      availableVersions: A([{ id: 'ember-2.17.1' }, { id: 'ember-2.16.1' }])
    };

    let result = getFullVersion(projectObj, '2.17.1');
    assert.equal(result, '2.17.1');
  });
});
