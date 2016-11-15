import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    select(tabName) {
      this.set('selectedTab', tabName);
    }
  }
});
