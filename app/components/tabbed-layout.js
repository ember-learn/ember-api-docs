import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tabbed-layout'],

  actions: {
    select(tabName) {
      this.onSelection(tabName);
      return false;
    }
  }
});
