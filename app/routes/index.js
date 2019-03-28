import Route from '@ember/routing/route';

export default Route.extend({

  redirect() {
    return this.transitionTo('project', 'ember');
  }

});
