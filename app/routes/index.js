import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  redirect() {
    return this.transitionTo('project', 'ember');
  }
}
