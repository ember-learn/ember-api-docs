import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    return this.transitionTo('project', 'ember');
  }

});
