import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TableOfContentsComponent extends Component {
  transition = fade;

  @tracked showModules = true;
  @tracked showNamespaces = true;
  @tracked showClasses = true;

  @action
  toggle(prop) {
    this[prop] = !this[prop];
  }
}
