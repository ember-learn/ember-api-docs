import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

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
      console.log('route:project-version: transitioning to module', model.get('project.id'), model.get('compactVersion'), module);
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
      const projectVersionID = ver.compactVersion;
      let endingRoute, routeName;
      switch (routeName = this.router.currentRouteName) {
        case 'project-version.classes.class': {
          const className = this.modelFor(routeName).get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.classes.class.index': {
          const className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.modules.module.index': {
          const moduleName = this.paramsFor('project-version.modules.module').module;
          endingRoute = `modules/${moduleName}`;
          break;
        }
        case 'project-version.namespaces.namespace.index': {
          const namespaceName = this.paramsFor('project-version.namespaces.namespace').namespace;
          endingRoute = `namespaces/${namespaceName}`;
          break;
        }
        default:
          break;
      }
      // if the user is navigating to/from api versions >= 2.16, take them
      // to the home page instead of trying to translate the url
      let shouldConvertPackages = this.shouldConvertPackages(ver, this.modelFor(routeName).get('id'))
      if (shouldConvertPackages) {
        endingRoute = null;
      }

      if (endingRoute) {
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
    let targetVerNumbers = targetVer.id.split('.')
    let targetVersion = Number(targetVerNumbers[0] + '.' + targetVerNumbers[1])
    let prevVerNumbers = previousVer.split('-')[1].split('.')
    let previousVersion = Number(prevVerNumbers[0] + '.' + prevVerNumbers[1])
    return (previousVersion >= 2.16 || targetVersion >= 2.16)
  }
});
