import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import AnchorControllerSupport from 'ember-anchor/mixins/controller-support';

export default class MethodsController extends Controller.extend(
  AnchorControllerSupport
) {
  @service
  filterData;

  queryParams = ['anchor'];

  updateAnchor(fieldName) {
    this.set('anchor', fieldName);
  }
}
