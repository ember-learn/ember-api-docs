import Ember from 'ember';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';

const { Controller } = Ember;

export default Controller.extend(ParentNameMixin, {
  filterData: Ember.inject.service(),
  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    }
  }
});
