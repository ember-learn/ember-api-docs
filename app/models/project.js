import DS from 'ember-data';
import Ember from 'ember';
import semverCompare from 'npm:semver-compare';
import getMinorVersion from "../utils/get-minor-version";
import _ from 'lodash';


const {Model, attr, hasMany} = DS;
const {computed} = Ember;

export default Model.extend({
  name: attr(),
  githubUrl: attr(),
  projectVersions: hasMany('project-version', {async: true}),

  latestProjectVersion: computed.alias('sortedProjectVersions.firstObject'),
  sortedProjectVersions: computed(function() {
    let projectVersions =  this.hasMany('projectVersions').ids().map(id => id.split('-')[1]);
    let sortedVersions = projectVersions.sort((a, b) => semverCompare(b, a));

    sortedVersions = sortedVersions.map((version) => {
      const minorVersion = getMinorVersion(version);
      return { id: version, minorVersion };
    });
    
    let groupedVersions = _.groupBy(sortedVersions, version => version.minorVersion);

    return _.values(groupedVersions).map(groupedVersion => groupedVersion[0]);
  }),

});
