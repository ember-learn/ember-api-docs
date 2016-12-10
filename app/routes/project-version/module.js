import ClassRoute from './class';
import ResetScrollPositionMixin from 'ember-api-docs/mixins/reset-scroll-position';


export default ClassRoute.extend(ResetScrollPositionMixin, {

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
  }
});
