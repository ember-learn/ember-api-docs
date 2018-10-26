import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  router: service('-routing'),

  routeName: readOnly('router.currentRouteName'),
  parentName: computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 3).join('.');
  })
});
