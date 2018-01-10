import $ from 'jquery';
import { get } from '@ember/object';
import AnchorComponent from 'ember-anchor/components/ember-anchor';
import config from 'ember-api-docs/config/environment';

export default AnchorComponent.extend({

  // This overrides Ember Anchor to support scrolling within a fixed position element
  _scrollToElemPosition() {
    let qp = this.get('anchorQueryParam');
    let qpVal = this.get(get(this, 'attrs.a') ? 'a' : `controller.${qp}`);
    let elem = $(`[data-${qp}="${qpVal}"]`);
    let offset = elem.offset() ? elem.offset().top : 0;
    if (offset) {
      $(config.APP.scrollContainerSelector).scrollTop(offset);
    }
  }
});
