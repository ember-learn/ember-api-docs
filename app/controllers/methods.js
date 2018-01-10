import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import AnchorControllerSupport from "ember-anchor/mixins/controller-support";

export default Controller.extend(AnchorControllerSupport, {
  filterData: service(),
  queryParams: ['anchor'],

  updateAnchor(fieldName) {
    this.set('anchor', fieldName);
  }
});
