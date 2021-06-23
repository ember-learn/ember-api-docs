import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import AnchorControllerSupport from 'ember-anchor/mixins/controller-support';

export default class PropertiesController extends Controller.extend(
  AnchorControllerSupport
) {
  @service
  filterData;

  queryParams = ['anchor'];

  @action
  updateAnchor(fieldName) {
    this.set('anchor', fieldName);
  }
}
