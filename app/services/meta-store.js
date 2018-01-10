import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { A } from '@ember/array';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';

export default Service.extend({

  availableProjectVersions: {
    'ember': A(),
    'ember-data':A()
  },

  projectRevMap: {},

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
    let filtered = availProjVersions.filter(function(v, index) {
      // shorten versions to 2 digits and compare them. 2.15.0 becomes 2.15
      let vTrimmed = getCompactVersion(v);
      let compactProjTrimmed = getCompactVersion(compactProjVersion);
      return vTrimmed === compactProjTrimmed
    })
    // return the full version number, like 2.15.2
    return filtered[0]
  }
});
