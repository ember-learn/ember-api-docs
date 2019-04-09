import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias, readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import values from 'lodash.values';
import groupBy from 'lodash.groupby';
import semverCompare from 'semver-compare';
import getCompactVersion from '../utils/get-compact-version';

export default Controller.extend({

  filterData: service(),

  metaStore: service(),

  project: service(),

  showPrivateClasses: alias('filterData.sideNav.showPrivate'),

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
    return this.model.hasMany(relationship).ids().sort();
  },

  getRelationshipIDs(relationship) {
    const splitPoint = 2 + this.get('model.project.id').split('-').length - 1;
    const classes = this.model.hasMany(relationship);
    const sorted = A(classes.ids()).sort();
    //ids come in as ember-2.16.0-@ember/object/promise-proxy-mixin
    //so we take the string after the 2nd '-'
    return A(sorted).toArray().map(id => id.split('-').slice(splitPoint).join('-'));
  },

  shownClassesIDs: computed('showPrivateClasses', 'classesIDs', 'publicClassesIDs', function() {
    return this.showPrivateClasses ? this.classesIDs : this.publicClassesIDs;
  }),

  shownModuleIDs: computed('showPrivateClasses', 'moduleIDs', 'publicModuleIDs', function() {
    return this.showPrivateClasses ? this.moduleIDs : this.publicModuleIDs;
  }),

  shownNamespaceIDs: computed('showPrivateClasses', 'namespaceIDs', 'publicNamespaceIDs', function() {
    return this.showPrivateClasses ? this.namespaceIDs : this.publicNamespaceIDs;
  }),

  projectVersions: computed('metaStore.availableProjectVersions', 'model.project.id', function() {
    const projectVersions = this.get('metaStore.availableProjectVersions')[this.get('model.project.id')];
    let versions = projectVersions.sort((a, b) => semverCompare(b, a));

    versions = versions.map((version) => {
      const compactVersion = getCompactVersion(version);
      return { id: version, compactVersion };
    });
    let groupedVersions = groupBy(versions, version => version.compactVersion);

    return values(groupedVersions).map(groupedVersion => groupedVersion[0]);
  }),

  urlVersion: alias('project.urlVersion'),

  selectedProjectVersion:computed('projectVersions.[]', 'model.version', function() {
    return this.projectVersions.filter(pV => pV.id === this.get('model.version'))[0];
  }),

  activeProject: readOnly('model.project.id')
});
