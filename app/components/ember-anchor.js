import { get } from '@ember/object';
import AnchorComponent from 'ember-anchor/components/ember-anchor';
import config from 'ember-api-docs/config/environment';

export default AnchorComponent.extend({
  getOffset(element, container) {
    let offsetTop = element.offsetTop;
    let parent = element.offsetParent;
    while (parent != null && parent != container) {
      offsetTop  += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return offsetTop;
  },

  // This overrides Ember Anchor to support scrolling within a fixed position element
  _scrollToElemPosition() {
    let qp = this.anchorQueryParam;
    let qpVal = this.get(get(this, 'attrs.a') ? 'a' : `controller.${qp}`);
    let elem = document.querySelector(`[data-${qp}="${qpVal}"]`);
    let offset = elem.offsetHeight ? elem.offsetHeight : 0;

    if (offset) {
      const offsetTop = this.getOffset(elem, config.APP.scrollContainerSelector)
      document.querySelector(config.APP.scrollContainerSelector).scrollTo(0, offsetTop);
    }
  }
});
