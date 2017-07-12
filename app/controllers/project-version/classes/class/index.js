import Ember from 'ember';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';


export default Ember.Controller.extend(ParentNameMixin, {
  filterData: Ember.inject.service()
});
