import ClassRoute from '../classes/class';

export default ClassRoute.extend({
  beforeModel(model, transition) {
    this.replaceWith('packages');
  }
});
