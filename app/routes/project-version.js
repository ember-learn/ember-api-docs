import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import semverCompare from 'npm:semver-compare';

export default Route.extend({

  metaStore: service(),

  projectService: service('project'),

  titleToken: function(model) {
    return model.get('version');
  },

  async model({project, project_version}) {
    await this.store.findRecord('project', project);
    const projectVersion = this.get('metaStore').getFullVersion(project, project_version);
    const id = `${project}-${projectVersion}`;
    this.get('projectService').setVersion(projectVersion);
    return this.store.findRecord('project-version', id, { includes: 'project' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 30
  redirect(model, transition) {
    let classParams = transition.params['project-version.classes.class'];
    let moduleParams = transition.params['project-version.modules.module'];
    let namespaceParams = transition.params['project-version.namespaces.namespace'];
    if (!classParams && !moduleParams && !namespaceParams) {
      const modules = model.hasMany('modules').ids().sort();
      let module = modules[0].split('-').reduce((result, val, index, arry) => {
        if (val === this.get('projectService.version')) {
          return arry.slice(index+1).join('-');
        }
        return result;
      })
      return this.transitionTo('project-version.modules.module', model.get('project.id'), model.get('compactVersion'), module);
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
          let moduleName = this.paramsFor('project-version.modules.module').module;
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
    let targetVersion = targetVer.id.split('.').slice(0, 2).join('.');
    let previousVersion = previousVer.split('.').slice(0,2).join('.');
    let previousComparison = semverCompare(previousVersion, '2.16');
    let targetComparison = semverCompare(targetVersion, '2.16');
    return (previousComparison < 0 && targetComparison >=0) || (previousComparison >=0 && targetComparison < 0);
  }
});
