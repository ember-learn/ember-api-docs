import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  selectedTab: '',

  id: Ember.computed('name', function () {
    return `tab-item-${this.get('name')}`;
  }),

  isVisible: Ember.computed('selectedTab', 'name', function () {
    return this.get('selectedTab') === this.get('name');
  })
});
