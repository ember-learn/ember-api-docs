import Ember from 'ember';

export default Ember.Service.extend({

  availableProjectVersions: Ember.A(),

  projectRevMap: {},

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.get('projectRevMap');
    projectRevMap[projectVersionKey] =  projectRevDoc;
    this.set('projectRevMap', projectRevMap);
  },

  getRevId(project, version, type, id) {
    return this.get('projectRevMap')[`${project}-${version}`][type][id];
  }

});
