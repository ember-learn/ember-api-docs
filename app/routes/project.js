import Ember from 'ember';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';

const { Route, inject } = Ember;

export default Route.extend(ScrollTracker, {
  
  model({project: projectName}) {
    return this.store.findRecord('project', projectName, { includes: 'project-version' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 307 in fastboot
  redirect(project /*, transition */) {
    return this.transitionTo('project-version', project.get('id'), project.get('latestProjectVersion.id'));
  }

});
