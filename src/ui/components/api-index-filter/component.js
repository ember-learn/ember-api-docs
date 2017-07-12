import Ember from 'ember';
import _ from 'lodash';


export default Ember.Component.extend({
  classNames: ['api-index-filter'],

  filteredMethods: Ember.computed('model.methods.[]',
    'filterData.showInherited',
    'filterData.showProtected',
    'filterData.showPrivate',
    'filterData.showDeprecated',
    function() {
      return this.filterItems('methods');
    }),

  filteredEvents: Ember.computed('model.events.[]',
    'filterData.showInherited',
    'filterData.showProtected',
    'filterData.showPrivate',
    'filterData.showDeprecated',
    function() {
      return this.filterItems('events');
    }),

  filteredProperties: Ember.computed('model.properties.[]',
    'filterData.showInherited',
    'filterData.showProtected',
    'filterData.showPrivate',
    'filterData.showDeprecated',
    function() {
      return this.filterItems('properties');
    }),

  filterItems(itemType) {
    let items = this.getWithDefault(`model.${itemType}`, []);
    if (!this.get('filterData.showInherited')) {
      items = items.filter(item => item.inherited !== true);
    }
    if (!this.get('filterData.showProtected')) {
      items = items.filter(item => item.access !== 'protected');
    }
    if (!this.get('filterData.showPrivate')) {
      items = items.filter(item => item.access !== 'private');
    }
    if (!this.get('filterData.showDeprecated')) {
      items = items.filter(item => item.deprecated !== true);
    }
    return _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
  },

  filteredData: Ember.computed('filteredMethods', 'filteredProperties', 'filteredEvents', function() {
    return {
      methods: this.get('filteredMethods'),
      properties: this.get('filteredProperties'),
      events: this.get('filteredEvents')
    };
  })

});
