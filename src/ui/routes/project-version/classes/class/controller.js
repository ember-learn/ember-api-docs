import Ember from 'ember';
import ParentNameMixin from "ember-api-docs/src/utils/mixins/parent-name";


export default Ember.Controller.extend(ParentNameMixin, {
  filterData: Ember.inject.service(),

  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    }
  }
});
