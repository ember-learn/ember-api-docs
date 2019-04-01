import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { gt } from '@ember/object/computed';

export default Component.extend({
  legacyModuleMappings: service(),

  hasImportExample: computed('field.{name,class}', function () {
    return this.legacyModuleMappings.hasFunctionMapping(this.get('field.name'), this.get('field.class'));
  }),

  stickyEnabled: gt('ownHeight', 200),

  didInsertElement() {
    this._super(...arguments);
    this.setOwnHeight(this.element);
  },

  setOwnHeight(element) {
    this.set('ownHeight', element.clientHeight);
  },

  /**
   * Callback for updating the anchor with the field name that was clicked by a user.
   *
   * @method updateAnchor
   * @method fieldName String The name representing the field that was clicked.
   */
  updateAnchor() {}
});
