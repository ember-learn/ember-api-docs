import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    select(tabName) {
      console.log('select!' + tabName);
      this.set('selectedTab', tabName);
      return false;
    }
  }
});
