import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('project', params.project);
  },
  afterModel(project, transition) {
    return project.get('projectVersions').then(versions => {
      const first = Ember.A(versions).sortBy('id')[0];
      this.transitionTo('project-version', first);
    });
  }
});
