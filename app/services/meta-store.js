import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { get, set } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({

  availableProjectVersions: {
    'ember': A(),
    'ember-data': A()
  },

  projectRevMap: {},

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = get(this, 'projectRevMap');
    if (!isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] = projectRevDoc;
      set(this, 'projectRevMap', projectRevMap);
    }
  },

  getRevId(project, version, type, id) {
    return get(this, 'projectRevMap')[`${project}-${version}`][type][id];
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
    const availProjVersions = get(this, `availableProjectVersions.${projectName}`);
    return availProjVersions.filter(v => v.includes(compactProjVersion))[0];
  }

});
