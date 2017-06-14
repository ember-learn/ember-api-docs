import ClassRoute from '../classes/class';

export default ClassRoute.extend({
  templateName: 'project-version/class',

  model(params, transition) {
    return this.getModel('namespace', params, transition);
  },

  serialize(model) {
    return {
      namespace: model.get('name')
    };
  }
});
