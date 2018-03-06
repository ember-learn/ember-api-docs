import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { A } from '@ember/array';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set("availableProjectVersions", {
      'ember': A(),
      'ember-data':A()
    });
    this.set("projectRevMap", {})
  },
  availableProjectVersions: null,

  projectRevMap: null,

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.get('projectRevMap');
    if (!isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] =  projectRevDoc;
      this.set('projectRevMap', projectRevMap);
    }
  },

  getRevId(project, version, type, id) {
    let encodedId = encodeURIComponent(id);
    return this.get('projectRevMap')[`${project}-${version}`][type][encodedId];
  },

  getEncodedModulesFromProjectRev(id) {
    return Object.keys(this.get('projectRevMap')[id].module).sort();
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
    let filtered = availProjVersions.filter((v, index) => getCompactVersion(v) === getCompactVersion(compactProjVersion));
    // since there can be multiple full versions that match the compact version, use the most recent one.
    return filtered.reduce((accumulator, current) => accumulator.split('.')[2] < current.split('.')[2] ? current : accumulator);
  }
});
