import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';

export default ClassRoute.extend(ScrollTracker, {

  model(params, transition) {
    return this.getModel('module', params, transition);
  },

  getModel(typeName, params, transition) {
    const projectID = transition.params['project-version'].project;
    const compactVersion = transition.params['project-version'].project_version;
    const projectVersion = this.get('metaStore').getFullVersion(projectID, compactVersion);

    let klass = params[typeName];
    if (!~klass.indexOf(projectID) && klass !== 'rsvp' && klass !== 'jquery') {
      klass = `${projectID}-${klass}`;
    }
    console.log('routes:project-version/modules/module: finding', typeName, `${projectID}-${projectVersion}-${klass}`);
    return this.find(typeName, `${projectID}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    console.log('routes:project-version/modules/module: serializing', model.get('name'));
    return {
      module: model.get('name')
    };
  }

});
