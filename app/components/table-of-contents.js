import { action } from '@ember/object';
import Component from '@ember/component';
import jQuery from 'jquery';

export default class TableOfContents extends Component {
  @action
  toggle(type) {
    jQuery(this.element)
      .find('ol.toc-level-1.' + type)
      .slideToggle(200);
  }
}
