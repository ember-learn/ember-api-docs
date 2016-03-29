import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggle() {
      this.$('ol.toc-level-1').slideToggle(200);
    }
  }
});
