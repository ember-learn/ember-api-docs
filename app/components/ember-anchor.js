/* eslint-disable ember/classic-decorator-no-classic-methods */
import AnchorComponent from 'ember-anchor/components/ember-anchor';
import config from 'ember-api-docs/config/environment';
import getOffset from 'ember-api-docs/utils/get-offset';

export default class EmberAnchor extends AnchorComponent {
  // This overrides Ember Anchor to support scrolling within a fixed position element
  _scrollToElemPosition() {
    let elem = document.querySelector(
      `[data-${this.anchorQueryParam}="${this.a}"]`
    );

    if (elem && elem.offsetHeight) {
      const offsetToScroll = getOffset(
        elem,
        config.APP.scrollContainerSelector
      );
      const scrollContainer = document.querySelector(
        config.APP.scrollContainerSelector
      );
      if (scrollContainer.scrollTo) {
        scrollContainer.scrollTo(0, offsetToScroll);
      } else {
        // fallback for IE11
        scrollContainer.scrollTop = offsetToScroll;
      }
    }
  }
}
