import Ember from 'ember';

const { inject } = Ember;

export default Ember.Helper.extend({

  router: inject.service(),

  compute([modelName, paramName]) {
    return this.get(`router.router.state.params.${modelName}.${paramName}`);
  }
});
