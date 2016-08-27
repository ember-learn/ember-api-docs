import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('version');
  },

  model(params) {
    const id = `${params.project}-${params.project_version}`;
    return this.store.find('project-version', id);
  },

  afterModel(model, transition) {
    let classParams = transition.params['project-version.class'];
    return model.get('project').then(() => {
      if (!classParams) {
        const classes = model.hasMany('classes').ids().sort();
        const klass = classes[0];
        return this.store.find('class', klass).then(klass => {
          return this.transitionTo('project-version.class', model, klass);
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

      switch(routeName = this.router.currentRouteName) {
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

