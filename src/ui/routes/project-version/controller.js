import Ember from 'ember';
import _ from 'lodash';
import semverCompare from 'npm:semver-compare';
import FilterParams from "../../../utils/mixins/filter-params";


export default Ember.Controller.extend(FilterParams, {

  filterData: Ember.inject.service(),

  metaStore: Ember.inject.service(),

  showPrivateClasses: Ember.computed.alias('filterData.sideNav.showPrivate'),

  classesIDs: Ember.computed('model', function() {
    return this.getRelationshipIDs('classes');
  }),

  publicClassesIDs: Ember.computed('model', function() {
    return this.getRelationshipIDs('public-classes');
  }),

  namespaceIDs: Ember.computed('model', function() {
    return this.getRelationshipIDs('namespaces');
  }),

  publicNamespaceIDs: Ember.computed('model', function() {
    return this.getRelationshipIDs('public-namespaces');
  }),

  moduleIDs: Ember.computed('model', function() {
    return this.getModuleRelationships(this.get('model.id'), 'modules');
  }),

  publicModuleIDs: Ember.computed('model', function() {
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
    const sorted = Ember.A(classes.ids()).sort();
    return Ember.A(sorted).toArray().map(id => id.split('-').pop());
  },

  shownClassesIDs: Ember.computed('showPrivateClasses', 'classesIDs', 'publicClassesIDs', function() {
    return this.get('showPrivateClasses') ? this.get('classesIDs') : this.get('publicClassesIDs');
  }),

  shownModuleIDs: Ember.computed('showPrivateClasses', 'moduleIDs', 'publicModuleIDs', function() {
    return this.get('showPrivateClasses') ? this.get('moduleIDs') : this.get('publicModuleIDs');
  }),

  shownNamespaceIDs: Ember.computed('showPrivateClasses', 'namespaceIDs', 'publicNamespaceIDs', function() {
    return this.get('showPrivateClasses') ? this.get('namespaceIDs') : this.get('publicNamespaceIDs');
  }),

  projectVersions: Ember.computed('metaStore.availableProjectVersions', 'model.project.id', function() {
    const projectVersions = this.get('metaStore.availableProjectVersions')[this.get('model.project.id')];
    let versions = projectVersions.sort((a, b) => semverCompare(b, a));

    versions = versions.map((version) => {
      const compactVersion = version.split('.').slice(0, 2).join('.');
      return { id: version, compactVersion };
    });
    let groupedVersions = _.groupBy(versions, version => version.compactVersion);

    return _.values(groupedVersions).map(groupedVersion => groupedVersion[0]);
  }),

  selectedProjectVersion:Ember.computed('projectVersions.[]', 'model.version', function() {
    return this.get('projectVersions').filter(pV => pV.id === this.get('model.version'))[0];
  }),

  activeProject: Ember.computed.readOnly('model.project.id')
});
