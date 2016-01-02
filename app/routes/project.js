import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('project', params.project);
  },

  afterModel(project, transition) {
    const projectVersions = project.hasMany('projectVersions');
    const ids = Ember.A(projectVersions.ids()).sort();

    const id = ids[ids.length - 1].split('-').pop();
    this.transitionTo('project-version', project.get('id'), id)
  }
});
