import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Controller.extend({
  router: inject.service('-routing'),
  routeName: computed.readOnly('router.currentRouteName'),
  parentName: computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 2).join('.');
  }),

  init() {
    this._super(...arguments);
    this.set('filterData', Ember.Object.create({
      showInherited: false,
      showProtected: false,
      showPrivate: false,
      showDeprecated: false
    }));
  },

  actions: {
    updateFilter(field) {
      this.toggleProperty(`filterData.${field}`);
    }
  }
});
