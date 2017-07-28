import Ember from 'ember';
import uniq from 'npm:lodash.uniq';
import sortBy from 'npm:lodash.sortby';

const { computed, Component } = Ember;

export default Component.extend({
  classNames: ['api-index-filter'],

  filteredMethods: computed('model.methods.[]',
    'filterData.showInherited',
    'filterData.showProtected',
    'filterData.showPrivate',
    'filterData.showDeprecated',
    function() {
      return this.filterItems('methods');
    }),

  filteredEvents: computed('model.events.[]',
    'filterData.showInherited',
    'filterData.showProtected',
    'filterData.showPrivate',
    'filterData.showDeprecated',
    function() {
      return this.filterItems('events');
    }),

  filteredProperties: computed('model.properties.[]',
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
    return uniq(sortBy(items, 'name'), true, (item => item.name));
  },

  filteredData: computed('filteredMethods', 'filteredProperties', 'filteredEvents', function() {
    return {
      methods: this.get('filteredMethods'),
      properties: this.get('filteredProperties'),
      events: this.get('filteredEvents')
    };
  })

});
