import Ember from 'ember';
import getLastVersion from '../utils/get-last-version';

const { Route, inject: {service} } = Ember;

export default Route.extend({

  scrollPositionReset: service(),

  model({project: projectName}) {
    return this.store.findRecord('project', projectName, { includes: 'project-version' });
  },

  // Using redirect instead of afterModel so transition succeeds and returns 307 in fastboot
  redirect(project /*, transition */) {
    const versions = project.get('projectVersions').toArray();
    let last = getLastVersion(versions);
    return this.transitionTo('project-version', project.get('id'), last);
  },

  actions: {

    willTransition(transition) {
      this.get('scrollPositionReset').scheduleReset(transition);
    },

    didTransition() {
      this.get('scrollPositionReset').doReset();
    }
  }
});
