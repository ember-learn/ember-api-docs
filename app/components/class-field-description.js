import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

class Field {
  @tracked name;
  @tracked class;
}

export default class ClassFieldDescription extends Component {
  @service
  legacyModuleMappings;

  field = new Field();

  get hasImportExample() {
    return this.legacyModuleMappings.hasFunctionMapping(
      this.field.name,
      this.field.class
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
