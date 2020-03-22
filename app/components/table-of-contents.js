import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TableOfContentsComponent extends Component {
  @tracked showModules = true;
  @tracked showNamespaces = true;
  @tracked showClasses = true;

  @action
  toggle(prop) {
    this[prop] = !this[prop];
  }
}
