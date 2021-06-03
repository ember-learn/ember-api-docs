/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-tagless-components, ember/no-actions-hash */
import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  actions: {
    showSuccess() {
      this.toggleProperty('showClipboardSuccessIcon');
      later(this, () => this.toggleProperty('showClipboardSuccessIcon'), 950);
    },
  },
});
