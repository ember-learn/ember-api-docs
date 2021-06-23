import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class ClassFieldDescription extends Component {
  @service
  legacyModuleMappings;

  @computed('field.{name,class}')
  get hasImportExample() {
    return this.legacyModuleMappings.hasFunctionMapping(
      this.get('field.name'),
      this.get('field.class')
    );
  }

  /**
   * Callback for updating the anchor with the field name that was clicked by a user.
   *
   * @method updateAnchor
   * @method fieldName String The name representing the field that was clicked.
   */
  updateAnchor() {}
}
