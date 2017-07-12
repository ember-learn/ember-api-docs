import AnchorComponent from 'ember-anchor/components/ember-anchor';
import Ember from 'ember';


export default AnchorComponent.extend({

  // This overrides Ember Anchor to support scrolling within a fixed position element
  _scrollToElemPosition() {
    let qp = this.get('anchorQueryParam');
    let qpVal = this.get(Ember.get(this, 'attrs.a') ? 'a' : `controller.${qp}`);
    let elem = Ember.$(`[data-${qp}="${qpVal}"]`);
    let offset = (elem && elem.offset && elem.offset()) ? elem.offset().top : null;
    if (offset) {
      let scrollOffset = this.$().scrollParent().offset().top - this.$().scrollParent().scrollTop();
      this.$().scrollParent().scrollTop(offset - scrollOffset);
    }
  }
});
