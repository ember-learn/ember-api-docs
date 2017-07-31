import Ember from 'ember';
import _ from 'lodash';
import semverCompare from 'npm:semver-compare';
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

  packageIDs: computed('model', function() {
    return this.getModuleRelationships(this.get('model.id'), 'packages');
  }),

  publicPackageIDs: computed('model', function() {
    return this.getModuleRelationships(this.get('model.id'), 'public-packages');
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

  shownClassesIDs: computed('showPrivateClasses', 'classesIDs', 'publicClassesIDs', function() {
    return this.get('showPrivateClasses') ? this.get('classesIDs') : this.get('publicClassesIDs');
  }),

  shownPackageIDs: computed('showPrivateClasses', 'packageIDs', 'publicPackageIDs', function() {
    return this.get('showPrivateClasses') ? this.get('packageIDs') : this.get('publicPackageIDs');
  }),

  shownNamespaceIDs: computed('showPrivateClasses', 'namespaceIDs', 'publicNamespaceIDs', function() {
    return this.get('showPrivateClasses') ? this.get('namespaceIDs') : this.get('publicNamespaceIDs');
  }),

  projectVersions: computed('metaStore.availableProjectVersions', 'model.project.id', function() {
    const projectVersions = this.get('metaStore.availableProjectVersions')[this.get('model.project.id')];
    let versions = projectVersions.sort((a, b) => semverCompare(b, a));

    versions = versions.map((version) => {
      const compactVersion = version.split('.').slice(0, 2).join('.');
      return { id: version, compactVersion };
    });
    let groupedVersions = _.groupBy(versions, version => version.compactVersion);

    return _.values(groupedVersions).map(groupedVersion => groupedVersion[0]);
  }),

  selectedProjectVersion:computed('projectVersions.[]', 'model.version', function() {
    return this.get('projectVersions').filter(pV => pV.id === this.get('model.version'))[0];
  }),

  activeProject: computed.readOnly('model.project.id')
});
