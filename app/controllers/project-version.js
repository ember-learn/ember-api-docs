/* eslint-disable ember/no-computed-properties-in-native-classes */
import { action, computed, set } from '@ember/object';
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

  @service
  fastboot;

  @service router;
  @service('project') projectService;

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
    return this.getModuleRelationships(this.model.id, 'modules');
  }

  @computed('model.id')
  get publicModuleIDs() {
    return this.getModuleRelationships(this.model.id, 'public-modules');
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
    // eslint-disable-next-line
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
    const projectVersions =
      this.metaStore.availableProjectVersions[
        this.model.belongsTo('project').id()
      ];
    let versions = projectVersions.sort((a, b) => semverCompare(b, a));

    versions = versions.map((version) => {
      const compactVersion = getCompactVersion(version);
      return { id: version, compactVersion };
    });
    let groupedVersions = groupBy(
      versions,
      (version) => version.compactVersion,
    );

    return values(groupedVersions).map((groupedVersion) => groupedVersion[0]);
  }

  @alias('project.urlVersion')
  urlVersion;

  @computed('projectVersions.[]', 'model.version')
  get selectedProjectVersion() {
    return this.projectVersions.filter((pV) => pV.id === this.model.version)[0];
  }

  @readOnly('model.project.id')
  activeProject;

  @action
  togglePrivateClasses() {
    set(this, 'showPrivateClasses', !this.showPrivateClasses);
  }

  @action
  updateProject(project, ver /*, component */) {
    const currentURL = this.router.currentURL;
    this.router.transitionTo(
      findEndingRoute({
        project,
        targetVersion: ver.id,
        currentVersion: this.projectService.version,
        currentUrlVersion: this.projectService.getUrlVersion(),
        currentURL,
        currentAnchor: window.location.hash,
      }),
    );
  }
}

export function findEndingRoute({
  project,
  targetVersion,
  currentVersion,
  currentUrlVersion,
  currentURL,
  currentAnchor,
}) {
  let projectVersionID = getCompactVersion(targetVersion);
  // if the user is navigating to/from api versions Ember >= 2.16 or Ember Data >= 4.0, take them
  // to the home page instead of trying to translate the url
  if (shouldGoToVersionIndex(project, targetVersion, currentVersion)) {
    return `/${project}/${projectVersionID}`;
  } else {
    return `${currentURL.replace(currentUrlVersion, projectVersionID)}${currentAnchor}`;
  }
}

function shouldGoToVersionIndex(project, targetVersion, currentVersion) {
  let boundaryVersion;
  if (project === 'ember') {
    boundaryVersion = '2.16';
  } else if (project === 'ember-data') {
    boundaryVersion = '4.0';
  }
  return isCrossingVersionBoundary(
    targetVersion,
    currentVersion,
    boundaryVersion,
  );
}

// Input some version info, returns a boolean based on
// whether the user is switching versions for a release or later.
function isCrossingVersionBoundary(targetVer, previousVer, boundaryVersion) {
  let targetVersion = getCompactVersion(targetVer);
  let previousVersion = getCompactVersion(previousVer);
  let previousComparison = semverCompare(previousVersion, boundaryVersion);
  let targetComparison = semverCompare(targetVersion, boundaryVersion);
  return (
    (previousComparison < 0 && targetComparison >= 0) ||
    (previousComparison >= 0 && targetComparison < 0)
  );
}
