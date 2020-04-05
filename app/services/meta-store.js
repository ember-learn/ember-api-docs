import Service, { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
import { A } from '@ember/array';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

export default Service.extend({
  fastboot: service(),

  availableProjectVersions: null,
  projectRevMap: null,

  init() {
    this._super(...arguments);

    if (this.fastboot.isFastBoot) {
      this.createProperties();
      this.updateShoebox();
    } else {
      this.availableProjectVersions = this.fastboot.shoebox.retrieve('availableProjectVersions');
      this.projectRevMap = this.fastboot.shoebox.retrieve('projectRevMap');
    }

    if (!this.availableProjectVersions || !this.projectRevMap) {
      this.createProperties();
    }
  },

  createProperties() {
    this.availableProjectVersions = {
      'ember': A(),
      'ember-data':A()
    };
    this.projectRevMap = {};
  },

  updateShoebox() {
    if (this.fastboot.isFastBoot) {
      this.fastboot.shoebox.put('availableProjectVersions', this.availableProjectVersions);
      this.fastboot.shoebox.put('projectMap',this.projectRevMap);
    }
  },

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.projectRevMap;
    if (!isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] =  projectRevDoc;
      set(this, 'projectRevMap', projectRevMap);
      this.updateShoebox();
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
    });
    this.updateShoebox();
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
