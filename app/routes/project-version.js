import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const id = `${params.project}-${params.project_version}`
    return this.store.find('project-version', id);
  },

  afterModel(model) {
    return model.get('project');
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('version')
    }
  },

  actions: {
    updateProject(projectVersion, component) {
      const projectVersionID = projectVersion.get('version');
      const project = projectVersion.get('project.id');
      let endingRoute, routeName;

      switch(routeName = this.router.currentRouteName) {
        case 'project-version.class':
          endingRoute = `classes/${this.modelFor(routeName).get('name')}`;
          break;
        default:
          break;
      }

      this.transitionTo(`/${project}/${projectVersionID}/${endingRoute}`);
    }
  }
});

