import Ember from 'ember';
import _ from 'lodash';

export default Ember.Route.extend({
  projectService: Ember.inject.service('project'),

  titleToken: function(model) {
    return model.get('version');
  },

  async model(params) {
    const id = `${params.project}-${params.project_version}`;
    this.get('projectService').setVersion(params.project_version);
    await this.store.findRecord('project', params.project);
    return this.store.findRecord('project-version', id, { includes: 'project' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 30
  redirect(model, transition) {
    let classParams = transition.params['project-version.classes.class'];
    let moduleParams = transition.params['project-version.modules.module'];
    let namespaceParams = transition.params['project-version.namespaces.namespace'];
    if (!classParams && !moduleParams && !namespaceParams) {
      const namespaces = model.hasMany('namespaces').ids().sort();
      const namespace = _.last(namespaces[0].split("-"));
      return this.transitionTo('project-version.namespaces.namespace', model.get('project.id'), model.get('version'), namespace);
    }
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('version')
    };
  },

  actions: {
    updateProject(project, ver /*, component */) {
      const projectVersionID = ver.id;
      let endingRoute, routeName;

      switch (routeName = this.router.currentRouteName) {
        case 'project-version.classes.class': {
          const className = this.modelFor(routeName).get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.classes.index': {
          const className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.modules.index': {
          const moduleName = this.pasramsFor('project-version.modules.module').module;
          endingRoute = `modules/${moduleName}`;
          break;
        }
        case 'project-version.namespaces.index': {
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
