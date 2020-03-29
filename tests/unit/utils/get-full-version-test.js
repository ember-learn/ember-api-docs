import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { module, test } from 'qunit';
import Service from '@ember/service';
import { A } from '@ember/array';
import DS from 'ember-data';

const { ManyArray } = DS;

module('Unit | Utility | get full version', function() {
  test('should return full version when release', function(assert) {
    let metaStore = Service.create({
      getFullVersion(project, urlVersion) {
        assert.equal(project, 'ember');
        assert.equal(urlVersion, '2.17');
        return '2.17.1';
      }
    });

    // mock the project object hasMany relationship
    // hasMany('projectVersions') returns a DS.ManyArray
    // and getFullVersion() calls ids() on it
    let projectVersions = ManyArray.create({
      content: A([{ id: 'ember-2.17.1'}, { id: 'ember-2.16.1' }]),
      flushCanonical() {},
      ids() {
        return this.content.map(obj => obj.id);
      }
    });
    let projectObj = {
      hasMany() {
        return projectVersions;
      }
    };

    let result = getFullVersion('release', 'ember', projectObj, metaStore);
    assert.equal(result, '2.17.1');
  });
});
