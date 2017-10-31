import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';

export default ClassRoute.extend(ScrollTracker, {
  templateName: 'project-version/classes/class',

  model(params, transition) {
    return this.getModel('namespace', params, transition);
  },

  serialize(model) {
    return {
      namespace: model.get('name')
    };
  }
});
