import Ember from 'ember';

const { computed, inject, Mixin } = Ember;

export default Mixin.create({
  router: inject.service('-routing'),

  routeName: computed.readOnly('router.currentRouteName'),
  parentName: computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 2).join('.');
  })
});
