import { action } from '@ember/object';
import Component from '@glimmer/component';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class ImportExample extends Component {
  @tracked showClipboardSuccessIcon = false;

  @action
  showSuccess() {
    this.showClipboardSuccessIcon = true;
    later(this, () => (this.showClipboardSuccessIcon = false), 950);
  }
}
