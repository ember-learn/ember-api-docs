/* eslint-disable prettier/prettier */
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ClassFieldDescription extends Component {
  @service
  legacyModuleMappings;

  get hasImportExample() {
    return this.legacyModuleMappings.hasFunctionMapping(
      this.args.field.name,
      this.args.field.class
    );
  }

  /**
   * Callback for updating the anchor with the field name that was clicked by a user.
   *
   * @method updateAnchor
   * @method fieldName String The name representing the field that was clicked.
   */
  @action
  updateAnchor(fieldName) {
    this.args.updateAnchor?.(fieldName);
  }
}
