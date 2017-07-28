import Ember from 'ember';
import last from 'npm:lodash.last';

export default Ember.Route.extend({

  metaStore: Ember.inject.service(),

  projectService: Ember.inject.service('project'),

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
      const namespaces = model.hasMany('namespaces').ids().sort();
      const namespace = last(namespaces[0].split("-"));
      return this.transitionTo('project-version.namespaces.namespace', model.get('project.id'), model.get('compactVersion'), namespace);
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

      if (endingRoute) {
        this.transitionTo(`/${project}/${projectVersionID}/${endingRoute}`);
      } else {
        this.transitionTo(`/${project}/${projectVersionID}`);
      }
    }
  }
});
