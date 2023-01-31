import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
import { A } from '@ember/array';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import { tracked } from '@glimmer/tracking';

export default class MetaStoreService extends Service {
  @tracked availableProjectVersions = {
    ember: A(),
    'ember-data': A(),
  };
  @tracked projectRevMap = {};

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.projectRevMap;
    if (!isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] = projectRevDoc;
      set(this, 'projectRevMap', projectRevMap);
    }
  }

  getRevId(project, version, type, id) {
    let encodedId = id;
    return this.projectRevMap[`${project}-${version}`][type][encodedId];
  }

  getEncodedModulesFromProjectRev(id) {
    return Object.keys(this.projectRevMap[id].module).sort();
  }

  initializeStore(availableProjectVersions, projectRevMap) {
    this.availableProjectVersions = {
      ember: A(availableProjectVersions['ember']),
      'ember-data': A(availableProjectVersions['ember-data']),
    };
    this.projectRevMap = projectRevMap;
  }

  getFullVersion(projectName, compactProjVersion) {
    const availProjVersions = this.availableProjectVersions[projectName];
    let filtered = availProjVersions.filter(
      (v) => getCompactVersion(v) === getCompactVersion(compactProjVersion)
    );
    if (filtered.length === 0) {
      return;
    }
    // since there can be multiple full versions that match the compact version, use the most recent one.
    return getLastVersion(filtered);
  }
}
