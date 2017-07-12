import ClassRoute from "../../classes/class/route";
import ScrollTracker from "ember-api-docs/src/utils/mixins/scroll-tracker/mixin";

export default ClassRoute.extend(ScrollTracker, {

  model(params, transition) {
    return this.getModel('module', params, transition);
  },

  getModel(typeName, params, transition) {
    const projectID = transition.params['project-version'].project;
    const compactVersion = transition.params['project-version'].project_version;
    const projectVersion = this.get('metaStore').getFullVersion(projectID, compactVersion);

    let klass = params[typeName];
    if (!~klass.indexOf(projectID)) {
      klass = `${projectID}-${klass}`;
    }
    return this.find(typeName, `${projectID}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      module: model.get('name')
    };
  }

});
