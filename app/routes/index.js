import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  redirect() {
    return this.router.transitionTo('project', 'ember');
  }
}
