import Ember from 'ember';


export default Ember.Service.extend({

  availableProjectVersions: {
    'ember': Ember.A(),
    'ember-data':Ember.A()
  },

  projectRevMap: {},

  addToProjectRevMap(projectVersionKey, projectRevDoc) {
    let projectRevMap = this.get('projectRevMap');
    if (!Ember.isPresent(projectRevMap[projectVersionKey])) {
      projectRevMap[projectVersionKey] =  projectRevDoc;
      this.set('projectRevMap', projectRevMap);
    }
  },

  getRevId(project, version, type, id) {
    return this.get('projectRevMap')[`${project}-${version}`][type][id];
  },

  initializeStore(availableProjectVersions, projectRevMap) {
    this.setProperties({
      availableProjectVersions: {
        'ember': Ember.A(availableProjectVersions['ember']),
        'ember-data': Ember.A(availableProjectVersions['ember-data'])
      },
      projectRevMap: projectRevMap
    })
  },

  getFullVersion(projectName, compactProjVersion) {
    const availProjVersions = this.get(`availableProjectVersions.${projectName}`);
    return availProjVersions.filter(v => v.includes(compactProjVersion))[0];
  }

});
