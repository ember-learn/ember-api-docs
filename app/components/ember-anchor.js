import { get } from '@ember/object';
import AnchorComponent from 'ember-anchor/components/ember-anchor';
import config from 'ember-api-docs/config/environment';
import getOffset from 'ember-api-docs/utils/get-offset';

export default AnchorComponent.extend({
  // This overrides Ember Anchor to support scrolling within a fixed position element
  _scrollToElemPosition() {
    let qp = this.anchorQueryParam;
    let qpVal = this.get(get(this, 'attrs.a') ? 'a' : `controller.${qp}`);
    let elem = document.querySelector(`[data-${qp}="${qpVal}"]`);

    if (elem && elem.offsetHeight) {
      const offsetToScroll = getOffset(elem, config.APP.scrollContainerSelector);
      const scrollContainer = document.querySelector(config.APP.scrollContainerSelector);
      if (scrollContainer.scrollTo) {
        scrollContainer.scrollTo(0, offsetToScroll);
      } else {
        // fallback for IE11
        scrollContainer.scrollTop = offsetToScroll;
      }
    }
  }
});
