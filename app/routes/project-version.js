import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const id = `${params.project}-${params.project_version}`
    return this.store.find('project-version', id);
  }
});

