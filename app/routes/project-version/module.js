import Ember from 'ember';
import ClassRoute from './class';

const { inject } = Ember;

export default ClassRoute.extend({

  scrollPositionReset: inject.service(),

  model(params, transition) {
    return this.getModel('module', params, transition);
  },

  getModel(typeName, params, transition) {
    const projectID = transition.params['project-version'].project;
    const version = transition.params['project-version'].project_version;
    let klass = params[typeName];
    if (!~klass.indexOf(projectID)) {
      klass = `${projectID}-${klass}`;
    }
    return this.find(typeName, `${projectID}-${version}-${klass}`);
  },

  serialize(model) {
    return {
      module: model.get('name')
    };
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
