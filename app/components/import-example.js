import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  actions: {
    showSuccess() {
      this.toggleProperty('showClipboardSuccessIcon');
      later(this, () => this.toggleProperty('showClipboardSuccessIcon'), 950);
    }
  }
});
