import Ember from 'ember';

const { inject } = Ember;

export default Ember.Helper.extend({

  router: inject.service(),

  compute([modelName, paramName]) {
    return this.get(`router._router._routerMicrolib.state.params.${modelName}.${paramName}`);
  }
});
