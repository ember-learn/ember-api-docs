import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('project', params.project);
  },
  afterModel(project, transition) {
    return project.get('projectVersions').then(versions => {
      const last = Ember.A(versions).sortBy('id')[versions.length - 1];
      this.transitionTo('project-version', last);
    });
  }
});
