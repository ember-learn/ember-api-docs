import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class TableOfContents extends Component {
  @action
  toggle(type) {
    const tableElement = document.querySelector(
      `ul.sub-table-of-contents.${type}`
    );
    tableElement.classList.toggle('selected');
  }
}
