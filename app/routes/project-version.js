import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import semverCompare from 'npm:semver-compare';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default Route.extend({
  fastboot: service(),
  headData: service(),
  metaStore: service(),
  projectService: service('project'),

  titleToken: function(model) {
    return model.get('version');
  },

  async model({project, project_version}) {
    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(project_version, project, projectObj, this.get('metaStore'));
    let id = `${project}-${projectVersion}`;
    this.get('projectService').setUrlVersion(project_version);
    this.get('projectService').setVersion(projectVersion);
    return this.store.findRecord('project-version', id, { includes: 'project' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 30
  redirect(model, transition) {
    this._gatherHeadDataFromVersion(model, transition.params['project-version'].project_version);
    let classParams = transition.params['project-version.classes.class'];
    let moduleParams = transition.params['project-version.modules.module'];
    let namespaceParams = transition.params['project-version.namespaces.namespace'];
    if (!classParams && !moduleParams && !namespaceParams) {
      let moduleRevs = this.get('metaStore').getEncodedModulesFromProjectRev(model.get('id'));
      let module = this.getFirstModule(moduleRevs);
      return this.transitionTo('project-version.modules.module', model.get('project.id'), model.get('compactVersion'), module);
    }
  },

  _gatherHeadDataFromVersion(model, projectVersion) {
    this.set('headData.isRelease', projectVersion === 'release');
    this.set('headData.compactVersion', model.get('compactVersion'));
    this.set('headData.urlVersion', projectVersion);
    if (!this.get('headData.isRelease')) {
      let request = this.get('fastboot.request');
      let href = this.get('fastboot.isFastBoot') ? `${request.protocol}//${request.host}${request.path}` : window.location.href;
      let version = new RegExp(model.get('compactVersion'), 'g')
      let canonicalUrl =href.replace(version, 'release');
      this.set('headData.canonicalUrl', canonicalUrl);
    }
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
      let endingRoute, routeName;
      switch (routeName = this.router.currentRouteName) {
        case 'project-version.classes.class': {
          let className = this.modelFor(routeName).get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.classes.class.index': {
          let className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.modules.module.index': {
          let moduleName = encodeURIComponent(this.paramsFor('project-version.modules.module').module);
          endingRoute = `modules/${moduleName}`;
          break;
        }
        case 'project-version.namespaces.namespace.index': {
          let namespaceName = this.paramsFor('project-version.namespaces.namespace').namespace;
          endingRoute = `namespaces/${namespaceName}`;
          break;
        }
        case 'project-version.classes.class.methods.index': {
          let className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}/methods`;
          break;
        }
        case 'project-version.classes.class.events.index': {
          let className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}/events`;
          break;
        }
        case 'project-version.classes.class.properties.index': {
          let className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}/properties`;
          break;
        }
        case 'project-version.classes.class.methods.method': {
          let className = this.modelFor('project-version.classes.class').get('name');
          let methodName = this.paramsFor('project-version.classes.class.methods.method').method;
          endingRoute = `classes/${className}/methods/${methodName}?anchor=${methodName}`;
          break;
        }
        case 'project-version.classes.class.events.event': {
          let className = this.modelFor('project-version.classes.class').get('name');
          let eventName = this.paramsFor('project-version.classes.class.events.event').event;
          endingRoute = `classes/${className}/events/${eventName}?anchor=${eventName}`;
          break;
        }
        case 'project-version.classes.class.properties.property': {
          let className = this.modelFor('project-version.classes.class').get('name');
          let propertyName = this.paramsFor('project-version.classes.class.properties.property').property;
          endingRoute = `classes/${className}/properties/${propertyName}?anchor=${propertyName}`;
          break;
        }
        default:
          endingRoute = '';
          break;
      }
      // if the user is navigating to/from api versions >= 2.16, take them
      // to the home page instead of trying to translate the url
      let shouldConvertPackages = this.shouldConvertPackages(ver, this.get('projectService.version'));
      if (!shouldConvertPackages) {
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
    return (previousComparison < 0 && targetComparison >=0) || (previousComparison >=0 && targetComparison < 0);
  },

  /**
     splits the first encoded revision string in the list and takes the string after the version (which is the encoded name), then decodes the result.
     */
  getFirstModule(moduleRevs) {
    let encodedModule = moduleRevs[0].split('-').reduce((result, val, index, arry) => {
      if (val === this.get('projectService.version')) {
        return arry.slice(index+1).join('-');
      }
      return result;
    });
    return decodeURIComponent(encodedModule);
  }

});
