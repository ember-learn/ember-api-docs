import Ember from 'ember';


export default Ember.Mixin.create({
  router: Ember.inject.service('-routing'),

  routeName: Ember.computed.readOnly('router.currentRouteName'),

  parentName: Ember.computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 3).join('.');
  })
});
