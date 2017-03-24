import Ember from 'ember';
import _ from 'lodash';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('version');
  },

  model(params) {
    const id = `${params.project}-${params.project_version}`;
    return this.store.find('project', params.project).then(() => {
      return this.store.findRecord('project-version', id, { includes: 'project' });
    });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 30
  redirect(model, transition) {
    let classParams = transition.params['project-version.class'];
    let moduleParams = transition.params['project-version.module'];
    let namespaceParams = transition.params['project-version.namespace'];
    if (!classParams && !moduleParams && !namespaceParams) {
      const namespaces = model.hasMany('namespaces').ids().sort();
      const namespace = _.last(namespaces[0].split("-"));
      return this.transitionTo('project-version.namespace', model.get('project.id'), model.get('version'), namespace);
    }
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('version')
    };
  },

  actions: {
    updateProject(projectVersion /*, component */) {
      const ids = projectVersion.get('id').split('-');
      const projectVersionID = projectVersion.get('version') || ids[ids.length - 1];
      const project = projectVersion.get('project.id') || ids.slice(0, -1).join('-');
      let endingRoute, routeName;

      switch (routeName = this.router.currentRouteName) {
        case 'project-version.class':
          endingRoute = `classes/${this.modelFor(routeName).get('name')}`;
          break;
        case 'project-version.class.index':
          endingRoute = `classes/${this.modelFor('project-version.class').get('name')}`;
          break;
        case 'project-version.module.index':
          const moduleName = this.paramsFor('project-version.module').module;
          endingRoute = `modules/${moduleName}`;
        case 'project-version.namespace.index':
          const namespaceName = this.paramsFor('project-version.namespace').namespace;
          endingRoute = `namespaces/${namespaceName}`;
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
