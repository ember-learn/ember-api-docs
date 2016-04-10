import Ember from 'ember';
import _ from 'lodash/lodash';
import semverCompare from 'npm:semver-compare';
import getMinorVersion from "../utils/get-minor-version";

export default Ember.Controller.extend({
  classesIDs: Ember.computed('model', function() {
    const classes = this.get('model').hasMany('classes');
    const sorted = Ember.A(classes.ids()).sort();
    return Ember.A(sorted).toArray().map(id => id.split('-').pop());
  }),

  projectVersionIDs: Ember.computed('model', function() {
    const projectID = this.get('model').belongsTo('project').id();
    const project = this.store.peekRecord('project', projectID);

    return project.hasMany('projectVersions').ids();
  }),

  projectVersions: Ember.computed('model', function() {
    const projectVersions = this.get('model.project.projectVersions');
    let versions = projectVersions.toArray().sort(function(a, b) {
      const a_ver = a.get('id').split("-")[1];
      const b_ver = b.get('id').split("-")[1];
      return semverCompare(b_ver, a_ver);
    });
    versions.forEach(function(version) {
      const versionString = version.get('id').split("-")[1];
      const minorVersion = getMinorVersion(versionString);
      version.set('minorVersion', minorVersion);
    });
    let groupedVersions = _.groupBy(versions, function(version) {
      return version.get('minorVersion');
    });
    return _.values(groupedVersions).map(function(groupedVersion) {
      return groupedVersion[0];
    });
  }),

  activeProject: Ember.computed.alias('model.project.id')
});
