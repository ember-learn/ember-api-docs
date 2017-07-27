import Ember from 'ember';
import semverCompare from 'npm:semver-compare';

const { Service, isPresent, A, computed } = Ember;

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
    return this.get('projectRevMap')[`${project}-${version}`][type][id];
  },

  sortVersionsBySemVer(projectVersions) {
    let sortedVersions = projectVersions.sort((a, b) => semverCompare(b, a));
    sortedVersions = sortedVersions.map((version) => {
      const compactVersion = version.split('.').slice(0, 2).join('.');
      return { id: version, compactVersion };
    });

    return A(sortedVersions);
  },

  semVerSortedProjectVersions: computed('availableProjectVersions.ember.[]', 'availableProjectVersions.ember-data.[]', function() {
    return {
      'ember': this.sortVersionsBySemVer(this.get('availableProjectVersions.ember')),
      'ember-data': this.sortVersionsBySemVer(this.get('availableProjectVersions.ember-data'))
    }
  }),

  initializeStoreFromShoebox(availableProjectVersions, projectRevMap) {

    this.setProperties({
      availableProjectVersions: {
        'ember': A(availableProjectVersions['ember']),
        'ember-data': A(availableProjectVersions['ember-data'])
      },
      projectRevMap: projectRevMap
    })
  }

});
