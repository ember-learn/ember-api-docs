import Ember from 'ember';

const { inject, computed} = Ember;

export default Ember.Helper.extend({

  '-routing': inject.service(),

  compute([modelName, paramName]){
    return this.get(`-routing.router.currentState.routerJsState.params.${modelName}.${paramName}`);
  }
});

// export default Ember.Helper.helper(function([projectModel, version]){
//   return model.getProjectVersion(version);
// });