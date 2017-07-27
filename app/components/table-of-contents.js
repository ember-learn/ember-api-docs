import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    toggle(type) {
      this.$('ol.toc-level-1.' + type).slideToggle(200);
    }
  }
});
