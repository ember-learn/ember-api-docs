import { action } from '@ember/object';
import Component from '@ember/component';

export default class TableOfContents extends Component {
  @action
  toggle(type) {
    const tableElement = document.querySelector(`ol.toc-level-1.${type}`);
    tableElement.classList.toggle('selected');
  }
}
