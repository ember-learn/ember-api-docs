import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import semverCompare from 'semver-compare';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import config from 'ember-api-docs/config/environment';

export default Route.extend({
  fastboot: service(),
  headData: service(),
  metaStore: service(),
  router: service(),
  projectService: service('project'),

  titleToken: function(model) {
    return model.get('version');
  },

  async model({ project, project_version }) {
    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(
      project_version,
      project,
      projectObj,
      this.metaStore
    );
    let id = `${project}-${projectVersion}`;
    this.projectService.setUrlVersion(project_version);
    this.projectService.setVersion(projectVersion);
    return this.store.findRecord('project-version', id, { includes: 'project' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 307
  redirect(model, transition) {
    const lookupParams = routeName => {
      let route = transition.routeInfos.find(({ name }) => name === routeName);
      return route && route.params;
    };

    this._gatherHeadDataFromVersion(model, lookupParams('project-version').project_version);

    let classParams = lookupParams('project-version.classes.class');
    let moduleParams = lookupParams('project-version.modules.module');
    let namespaceParams = lookupParams('project-version.namespaces.namespace');
    let functionParams = lookupParams('project-version.functions.function');

    let transitionVersion = this.projectService.getUrlVersion();
    if (!classParams && !moduleParams && !namespaceParams && !functionParams) {
      // if there is no class, module, or namespace specified...
      let latestVersion = getLastVersion(model.get('project.content').hasMany('projectVersions').ids());
      let isLatestVersion = transitionVersion === latestVersion || transitionVersion === 'release';
      let shouldConvertPackages = semverCompare(model.get('version'), '2.16') < 0;
      if (!shouldConvertPackages || isLatestVersion) {
        // ... and the transition version is the latest release,
        // display the landing page at
        return this.transitionTo('project-version.index');
      } else {
        // else go to the version specified
        let moduleRevs = this.metaStore.getEncodedModulesFromProjectRev(model.get('id'));
        let module = this.getFirstModule(moduleRevs);
        return this.transitionTo(
          'project-version.modules.module',
          model.get('project.id'),
          transitionVersion,
          module
        );
      }
    }
  },

  _gatherHeadDataFromVersion(model, projectVersion) {
    this.set('headData.isRelease', projectVersion === 'release');
    this.set('headData.compactVersion', model.get('compactVersion'));
    this.set('headData.urlVersion', projectVersion);
    if (!this.get('headData.isRelease')) {
      let request = this.get('fastboot.request');
      let href = this.get('fastboot.isFastBoot')
        ? `${config.APP.domain}/${request.path}`
        : window.location.href;
      let version = new RegExp(model.get('compactVersion'), 'g');
      let canonicalUrl = href.replace(version, 'release');
      this.set('headData.canonicalUrl', canonicalUrl);
    }
  },

  _getEncodedNameForCurrentClass() {
    // escape any reserved characters for url, like slashes
    return encodeURIComponent(this.modelFor('project-version.classes.class').get('name'));
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('compactVersion')
    };
  },

  actions: {
    updateProject(project, ver /*, component */) {
      let projectVersionID = ver.compactVersion;
      let endingRoute;
      switch (this.router.currentRouteName) {
        case 'project-version.classes.class': {
          let className = this._getEncodedNameForCurrentClass();
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.classes.class.index': {
          let className = this._getEncodedNameForCurrentClass();
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.modules.module.index': {
          let moduleName = encodeURIComponent(
            this.paramsFor('project-version.modules.module').module
          );
          endingRoute = `modules/${moduleName}`;
          break;
        }
        case 'project-version.namespaces.namespace.index': {
          let namespaceName = this.paramsFor('project-version.namespaces.namespace').namespace;
          endingRoute = `namespaces/${namespaceName}`;
          break;
        }
        case 'project-version.classes.class.methods.index': {
          let className = this._getEncodedNameForCurrentClass();
          endingRoute = `classes/${className}/methods`;
          break;
        }
        case 'project-version.classes.class.events.index': {
          let className = this._getEncodedNameForCurrentClass();
          endingRoute = `classes/${className}/events`;
          break;
        }
        case 'project-version.classes.class.properties.index': {
          let className = this._getEncodedNameForCurrentClass();
          endingRoute = `classes/${className}/properties`;
          break;
        }
        case 'project-version.classes.class.methods.method': {
          let className = this._getEncodedNameForCurrentClass();
          let methodName = this.paramsFor('project-version.classes.class.methods.method').method;
          endingRoute = `classes/${className}/methods/${methodName}?anchor=${methodName}`;
          break;
        }
        case 'project-version.classes.class.events.event': {
          let className = this._getEncodedNameForCurrentClass();
          let eventName = this.paramsFor('project-version.classes.class.events.event').event;
          endingRoute = `classes/${className}/events/${eventName}?anchor=${eventName}`;
          break;
        }
        case 'project-version.classes.class.properties.property': {
          let className = this._getEncodedNameForCurrentClass();
          let propertyName = this.paramsFor('project-version.classes.class.properties.property')
            .property;
          endingRoute = `classes/${className}/properties/${propertyName}?anchor=${propertyName}`;
          break;
        }
        default:
          endingRoute = '';
          break;
      }
      // if the user is navigating to/from api versions >= 2.16, take them
      // to the home page instead of trying to translate the url
      let shouldConvertPackages = this.shouldConvertPackages(
        ver,
        this.get('projectService.version')
      );
      let isEmberProject = project === 'ember';
      if (!isEmberProject || !shouldConvertPackages) {
        this.transitionTo(`/${project}/${projectVersionID}/${endingRoute}`);
      } else {
        this.transitionTo(`/${project}/${projectVersionID}`);
      }
    }
  },
  // Input some version info, returns a boolean based on
  // whether the user is switching versions for a 2.16 docs release or later.
  // The urls for pre-2.16 classes and later packages are quite different
  shouldConvertPackages(targetVer, previousVer) {
    let targetVersion = getCompactVersion(targetVer.id);
    let previousVersion = getCompactVersion(previousVer);
    let previousComparison = semverCompare(previousVersion, '2.16');
    let targetComparison = semverCompare(targetVersion, '2.16');
    return (
      (previousComparison < 0 && targetComparison >= 0) ||
      (previousComparison >= 0 && targetComparison < 0)
    );
  },

  /**
     splits the first encoded revision string in the list and takes the string after the version (which is the encoded name), then decodes the result.
     */
  getFirstModule(moduleRevs) {
    let encodedModule = moduleRevs[0].split('-').reduce((result, val, index, arry) => {
      if (val === this.get('projectService.version')) {
        return arry.slice(index + 1).join('-');
      }
      return result;
    });
    return decodeURIComponent(encodedModule);
  }
});
