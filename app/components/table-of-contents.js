/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-tagless-components, ember/no-actions-hash, ember/no-jquery */
import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggle(type) {
      this.$('ol.toc-level-1.' + type).slideToggle(200);
    },
  },
});
