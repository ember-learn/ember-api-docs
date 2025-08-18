/* eslint-disable ember/no-computed-properties-in-native-classes */
import { action, computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { readOnly, alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
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

  @service router;
  @service('project') projectService;

  @controller('project-version.classes.class') classController;
  @controller('project-version.modules.module') moduleController;
  @controller('project-version.namespaces.namespace') namespaceController;
  @controller('project-version.classes.class.methods') methodsController;
  @controller('project-version.classes.class.events') eventsController;
  @controller('project-version.classes.class.properties') propertiesController;

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
      (version) => version.compactVersion
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
    let projectVersionID = ver.compactVersion;
    let endingRoute;
    switch (this.router.currentRouteName) {
      case 'project-version.classes.class': {
        let className = this._getEncodedNameForCurrentClass();
        endingRoute = `classes/${className}`;
        break;
      }
      case 'project-version.modules.module': {
        let moduleName = encodeURIComponent(this.moduleController.model.name);
        endingRoute = `modules/${moduleName}`;
        break;
      }
      case 'project-version.namespaces.namespace': {
        let namespaceName = this.namespaceController.model.name;
        endingRoute = `namespaces/${namespaceName}`;
        break;
      }
      case 'project-version.classes.class.methods': {
        let className = this._getEncodedNameForCurrentClass();
        endingRoute = `classes/${className}/methods`;
        break;
      }
      case 'project-version.classes.class.events': {
        let className = this._getEncodedNameForCurrentClass();
        endingRoute = `classes/${className}/events`;
        break;
      }
      case 'project-version.classes.class.properties': {
        let className = this._getEncodedNameForCurrentClass();
        endingRoute = `classes/${className}/properties`;
        break;
      }
      case 'project-version.classes.class.methods.method': {
        let className = this._getEncodedNameForCurrentClass();
        let methodName = this.methodsController.anchor;
        endingRoute = `classes/${className}/methods/${methodName}?anchor=${methodName}`;
        break;
      }
      case 'project-version.classes.class.events.event': {
        let className = this._getEncodedNameForCurrentClass();
        let eventName = this.eventsController.anchor;
        endingRoute = `classes/${className}/events/${eventName}?anchor=${eventName}`;
        break;
      }
      case 'project-version.classes.class.properties.property': {
        let className = this._getEncodedNameForCurrentClass();
        let propertyName = this.propertiesController.anchor;
        endingRoute = `classes/${className}/properties/${propertyName}?anchor=${propertyName}`;
        break;
      }
      default:
        endingRoute = '';
        break;
    }
    // if the user is navigating to/from api versions >= 2.16, take them
    // to the home page instead of trying to translate the url
    let shouldConvertPackages = this._shouldConvertPackages(
      ver,
      this.projectService.version
    );
    let isEmberProject = project === 'ember';

    if (!isEmberProject || !shouldConvertPackages) {
      this.router.transitionTo(
        `/${project}/${projectVersionID}/${endingRoute}`
      );
    } else {
      this.router.transitionTo(`/${project}/${projectVersionID}`);
    }
  }

  _getEncodedNameForCurrentClass() {
    // escape any reserved characters for url, like slashes
    return encodeURIComponent(this.classController.model.get('name'));
  }

  // Input some version info, returns a boolean based on
  // whether the user is switching versions for a 2.16 docs release or later.
  // The urls for pre-2.16 classes and later packages are quite different
  _shouldConvertPackages(targetVer, previousVer) {
    let targetVersion = getCompactVersion(targetVer.id);
    let previousVersion = getCompactVersion(previousVer);
    let previousComparison = semverCompare(previousVersion, '2.16');
    let targetComparison = semverCompare(targetVersion, '2.16');
    return (
      (previousComparison < 0 && targetComparison >= 0) ||
      (previousComparison >= 0 && targetComparison < 0)
    );
  }
}
