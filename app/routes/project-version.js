import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('version');
  },

  model(params) {
    const id = `${params.project}-${params.project_version}`;
    return this.store.find('project', params.project).then(() => {
      return this.store.find('project-version', id);
    });
  },

  afterModel(model, transition) {
    let classParams = transition.params['project-version.class'];
    let moduleParams = transition.params['project-version.module'];
    let namespaceParams = transition.params['project-version.namespace'];
    return model.get('project').then(() => {
      if (!classParams && !moduleParams && !namespaceParams) {
        const namespaces = model.hasMany('namespaces').ids().sort();
        const namespace = namespaces[0];
        return this.store.find('namespace', namespace).then(namespace => {
          return this.transitionTo('project-version.namespace', model, namespace);
        });
      }
    });
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('version')
    };
  },

  actions: {
    updateProject(projectVersion /*, component */) {
      const projectVersionID = projectVersion.get('version');
      const project = projectVersion.get('project.id');
      let endingRoute, routeName;

      switch (routeName = this.router.currentRouteName) {
        case 'project-version.class':
          endingRoute = `classes/${this.modelFor(routeName).get('name')}`;
          break;
        case 'project-version.class.index':
          endingRoute = `classes/${this.modelFor('project-version.class').get('name')}`;
          break;
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
