import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash';
import config from 'ember-api-docs/config/environment';


const {Model, attr, hasMany} = DS;
const {computed,A,inject} = Ember;

export default Model.extend({

  metaStore: inject.service(),

  name: attr(),
  githubUrl: attr(),
  projectVersions: hasMany('project-version', {async: true}),

  latestProjectVersion: computed.alias('sortedProjectVersions.firstObject'),
  sortedProjectVersions: computed('metaStore.semVerSortedProjectVersions.[]', function() {
    const sortedVersions = this.get('metaStore.semVerSortedProjectVersions')[this.get('id')];
    let groupedVersions = _.groupBy(sortedVersions, version => version.compactVersion);

    return A(_.values(groupedVersions).map(groupedVersion => groupedVersion[0]));
  }),

  _getProjectVersion(version) {
    if (version === 'release') {
      return this.get('latestProjectVersion.id');
    }
    if (version === 'lts') {
      return config.ltsVersion;
    }
    return version;
  },

  getFullVersion(compactVersion) {
    const numericalVersion = this._getProjectVersion(compactVersion);
    return this.get('sortedProjectVersions').findBy('compactVersion', numericalVersion) || numericalVersion;
  }

});
