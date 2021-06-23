import { action } from '@ember/object';
import Component from '@ember/component';
import { later } from '@ember/runloop';

export default class ImportExample extends Component {
  @action
  showSuccess() {
    this.toggleProperty('showClipboardSuccessIcon');
    later(this, () => this.toggleProperty('showClipboardSuccessIcon'), 950);
  }
}
