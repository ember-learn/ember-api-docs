import Ember from 'ember';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';

const { Controller } = Ember;

export default Controller.extend(ParentNameMixin, {
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
