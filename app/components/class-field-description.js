import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  legacyModuleMappings: service(),

  hasImportExample: computed('field.{name,class}', function () {
    return this.get('legacyModuleMappings').hasFunctionMapping(this.get('field.name'), this.get('field.class'));
  }),

  /**
   * Callback for updating the anchor with the field name that was clicked by a user.
   *
   * @method updateAnchor
   * @method fieldName String The name representing the field that was clicked.
   */
  updateAnchor(fieldName) {}
});
