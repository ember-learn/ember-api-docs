import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class ClassFieldDescription extends Component {
  @service
  legacyModuleMappings;

  get hasImportExample() {
    return this.legacyModuleMappings.hasFunctionMapping(
      this.args.field.name,
      this.args.field.class,
    );
  }
}
