import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  filterData: service(),

  router: service(),

  parentName: computed('router.currentRouteName', function() {
    const routeName = this.router.currentRouteName;
    const routes = routeName.split('.');
    return routes.slice(0, 3).join('.');
  })
});
