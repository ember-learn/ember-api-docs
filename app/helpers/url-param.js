import Ember from 'ember';

const { inject } = Ember;

export default Ember.Helper.extend({

  '-routing': inject.service(),

  compute([modelName, paramName]) {
    return this.get(`-routing.router.currentState.routerJsState.params.${modelName}.${paramName}`);
  }
});
