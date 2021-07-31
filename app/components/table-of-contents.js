import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggle(type) {
      const tableElement = document.querySelector(`ol.toc-level-1.${type}`);
      tableElement.classList.toggle('selected');
    },
  },
});
