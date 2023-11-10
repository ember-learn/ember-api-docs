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
    'ember-cli': A(),
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
    let revType = this.projectRevMap[`${project}-${version}`][type];

    let matchingKey = Object.keys(revType).find(
      (key) => key.toLowerCase() === encodedId.toLowerCase()
    );

    return this.projectRevMap[`${project}-${version}`][type][matchingKey];
  }

  getEncodedModulesFromProjectRev(id) {
    return Object.keys(this.projectRevMap[id].module).sort();
  }

  initializeStore(availableProjectVersions, projectRevMap) {
    this.availableProjectVersions = {
      ember: A(availableProjectVersions['ember']),
      'ember-data': A(availableProjectVersions['ember-data']),
      'ember-cli': A(availableProjectVersions['ember-cli']),
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
