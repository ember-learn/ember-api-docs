import Ember from 'ember';

const { run: { later }, Component } = Ember;

export default Component.extend({
  actions: {
    showSuccess() {
      this.toggleProperty('showClipboardSuccessIcon');
      later(this, () => this.toggleProperty('showClipboardSuccessIcon'), 950);
    }
  }
});
