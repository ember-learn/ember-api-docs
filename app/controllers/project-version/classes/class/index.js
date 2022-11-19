import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { parentName } from '../../../../utils/parent-name';

export default class IndexController extends Controller {
  @service
  filterData;

  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  get parentName() {
    return parentName(this.router.currentRouteName);
  }
}
