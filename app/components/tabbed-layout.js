import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tabbed-layout'],

  actions: {
    select(tabName) {
      this.set('selectedTab', tabName);
      this.onSelection(tabName);
      return false;
    }
  }
});
