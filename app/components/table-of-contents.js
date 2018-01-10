import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggle(type) {
      this.$('ol.toc-level-1.' + type).slideToggle(200);
    }
  }
});
