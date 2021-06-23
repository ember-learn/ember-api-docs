import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { readOnly, alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import values from 'lodash.values';
import groupBy from 'lodash.groupby';
import semverCompare from 'semver-compare';
import getCompactVersion from '../utils/get-compact-version';

export default class ProjectVersionController extends Controller {
  @service
  filterData;

  @service
  metaStore;

  @service
  project;

  @alias('filterData.sideNav.showPrivate')
  showPrivateClasses;

  @computed('model')
  get classesIDs() {
    return this.getRelationshipIDs('classes');
  }

  @computed('model')
  get publicClassesIDs() {
    return this.getRelationshipIDs('public-classes');
  }

  @computed('model')
  get namespaceIDs() {
    return this.getRelationshipIDs('namespaces');
  }

  @computed('model')
  get publicNamespaceIDs() {
    return this.getRelationshipIDs('public-namespaces');
  }

  @computed('model.id')
  get moduleIDs() {
    return this.getModuleRelationships(this.get('model.id'), 'modules');
  }

  @computed('model.id')
  get publicModuleIDs() {
    return this.getModuleRelationships(this.get('model.id'), 'public-modules');
  }

  getModuleRelationships(versionId, moduleType) {
    let relations = this.getRelations(moduleType);
    // filter overviews out. If other projects add their overview we should filter those too.
    return relations
      .map((id) => id.substring(versionId.length + 1))
      .filter((id) => id !== 'ember-data-overview');
  }

  getRelations(relationship) {
    return this.model.hasMany(relationship).ids().sort();
  }

  getRelationshipIDs(relationship) {
    const splitPoint = 2 + this.get('model.project.id').split('-').length - 1;
    const classes = this.model.hasMany(relationship);
    const sorted = A(classes.ids()).sort();
    //ids come in as ember-2.16.0-@ember/object/promise-proxy-mixin
    //so we take the string after the 2nd '-'
    return A(sorted)
      .toArray()
      .map((id) => id.split('-').slice(splitPoint).join('-'));
  }

  @computed('showPrivateClasses', 'classesIDs', 'publicClassesIDs')
  get shownClassesIDs() {
    return this.showPrivateClasses ? this.classesIDs : this.publicClassesIDs;
  }

  @computed('showPrivateClasses', 'moduleIDs', 'publicModuleIDs')
  get shownModuleIDs() {
    return this.showPrivateClasses ? this.moduleIDs : this.publicModuleIDs;
  }

  @computed('showPrivateClasses', 'namespaceIDs', 'publicNamespaceIDs')
  get shownNamespaceIDs() {
    return this.showPrivateClasses
      ? this.namespaceIDs
      : this.publicNamespaceIDs;
  }

  @computed('metaStore.availableProjectVersions', 'model.project.id')
  get projectVersions() {
    const projectVersions = this.get('metaStore.availableProjectVersions')[
      this.get('model.project.id')
    ];
    let versions = projectVersions.sort((a, b) => semverCompare(b, a));

    versions = versions.map((version) => {
      const compactVersion = getCompactVersion(version);
      return { id: version, compactVersion };
    });
    let groupedVersions = groupBy(
      versions,
      (version) => version.compactVersion
    );

    return values(groupedVersions).map((groupedVersion) => groupedVersion[0]);
  }

  @alias('project.urlVersion')
  urlVersion;

  @computed('projectVersions.[]', 'model.version')
  get selectedProjectVersion() {
    return this.projectVersions.filter(
      (pV) => pV.id === this.get('model.version')
    )[0];
  }

  @readOnly('model.project.id')
  activeProject;
}
