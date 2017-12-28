import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { module, test } from 'qunit';
import Service from '@ember/service';
import Object from '@ember/object';
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

module('Unit | Utility | get full version');

test('should return full version when release', function(assert) {
  let metaStore = Service.create({
    getFullVersion(project, urlVersion) {
      assert.equal(project, 'ember');
      assert.equal(urlVersion, '2.17');
      return '2.17.1';
    }
  });
  let projectVersions = ArrayProxy.create({
    content: A([{ id: 'ember-2.17.1'}, { id: 'ember-2.16.1' }])
  });
  let projectObj = Object.create({ projectVersions });
  let result = getFullVersion('release', 'ember', projectObj, metaStore);
  assert.equal(result, '2.17.1');
});
