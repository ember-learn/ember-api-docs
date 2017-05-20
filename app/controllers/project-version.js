import Ember from 'ember';
import FilterParams from '../mixins/filter-params';

const { Controller, computed, A, inject: {service} } = Ember;

export default Controller.extend(FilterParams, {

  filterData: service(),

  metaStore: service(),

  showPrivateClasses: computed.alias('filterData.sideNav.showPrivate'),

  classesIDs: computed('model', function() {
    return this.getRelationshipIDs('classes');
  }),

  publicClassesIDs: computed('model', function() {
    return this.getRelationshipIDs('public-classes');
  }),

  namespaceIDs: computed('model', function() {
    return this.getRelationshipIDs('namespaces');
  }),

  publicNamespaceIDs: computed('model', function() {
    return this.getRelationshipIDs('public-namespaces');
  }),

  moduleIDs: computed('model', function() {
    return this.getModuleRelationships(this.get('model.id'), 'modules');
  }),

  publicModuleIDs: computed('model', function() {
    return this.getModuleRelationships(this.get('model.id'), 'public-modules');
  }),

  getModuleRelationships(versionId, moduleType) {
    let relations = this.getRelations(moduleType);
    return relations.map(id => id.substring(versionId.length + 1))
  },

  getRelations(relationship) {
    return this.get('model').hasMany(relationship).ids().sort();
  },

  getRelationshipIDs(relationship) {
    const classes = this.get('model').hasMany(relationship);
    const sorted = A(classes.ids()).sort();
    return A(sorted).toArray().map(id => id.split('-').pop());
  },

  projectVersions: computed.alias('model.project.sortedProjectVersions'),

  shownClassesIDs: computed('showPrivateClasses', 'classesIDs', 'publicClassesIDs', function() {
    return this.get('showPrivateClasses') ? this.get('classesIDs') : this.get('publicClassesIDs');
  }),

  shownModuleIDs: computed('showPrivateClasses', 'moduleIDs', 'publicModuleIDs', function() {
    return this.get('showPrivateClasses') ? this.get('moduleIDs') : this.get('publicModuleIDs');
  }),

  shownNamespaceIDs: computed('showPrivateClasses', 'namespaceIDs', 'publicNamespaceIDs', function() {
    return this.get('showPrivateClasses') ? this.get('namespaceIDs') : this.get('publicNamespaceIDs');
  }),

  selectedProjectVersion:computed('projectVersions.[]', 'model.version', function() {
    return this.get('projectVersions').filter(pV => pV.id === this.get('model.version'))[0];
  }),

  activeProject: computed.readOnly('model.project.id')
});
