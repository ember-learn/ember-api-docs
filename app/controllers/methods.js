import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import AnchorControllerSupport from 'ember-anchor/mixins/controller-support';
import { tracked } from '@glimmer/tracking';

export default class MethodsController extends Controller.extend(
  AnchorControllerSupport
) {
  @service
  filterData;

  @tracked
  anchor;

  queryParams = ['anchor'];

  updateAnchor(fieldName) {
    this.anchor = fieldName;
  }
}
