import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
import { A } from '@ember/array';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

export default Service.extend({

  availableProjectVersions: null,
  projectRevMap: null,

  init() {
    this.availableProjectVersions = {
      'ember': A(),
      'ember-data':A()
    };
    this.projectRevMap = {};
    this._super(...arguments);
  },

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.projectRevMap;
    if (!isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] =  projectRevDoc;
      set(this, 'projectRevMap', projectRevMap);
    }
  },

  getRevId(project, version, type, id) {
    let encodedId = encodeURIComponent(id);
    return this.projectRevMap[`${project}-${version}`][type][encodedId];
  },

  getEncodedModulesFromProjectRev(id) {
    return Object.keys(this.projectRevMap[id].module).sort();
  },

  initializeStore(availableProjectVersions, projectRevMap) {
    this.setProperties({
      availableProjectVersions: {
        'ember': A(availableProjectVersions['ember']),
        'ember-data': A(availableProjectVersions['ember-data'])
      },
      projectRevMap: projectRevMap
    })
  },

  getFullVersion(projectName, compactProjVersion) {
    const availProjVersions = this.get(`availableProjectVersions.${projectName}`);
    let filtered = availProjVersions.filter((v) => getCompactVersion(v) === getCompactVersion(compactProjVersion));
    if (filtered.length === 0) {
      return;
    }
    // since there can be multiple full versions that match the compact version, use the most recent one.
    return getLastVersion(filtered);
  }
});
