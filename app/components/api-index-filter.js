import Ember from 'ember';
import _ from 'lodash';

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
    let sortedUniqueItems = _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
    return this.filterMultipleInheritance(sortedUniqueItems)
  },

  filteredData: computed('filteredMethods', 'filteredProperties', 'filteredEvents', function() {
    return {
      methods: this.get('filteredMethods'),
      properties: this.get('filteredProperties'),
      events: this.get('filteredEvents')
    };
  }),

  /**
  * Show the most local property if there are duplicate properties of the same name.
  * The docs for the nearest inheritance are typically more helpful to users.
  * Ember-jsonapi-docs returns a mix of inherited/local, but once sorted, the
  * first item in the list is "most local."
  * @method filterMultipleInheritance
  */
  filterMultipleInheritance(items) {
    return items.filter(function(item, index, arr) {
      if (index === 0) {
        return true;
      } else if (item.name === arr[index - 1].name) {
        return false;
      } else {
        return true;
      }
    })
  }
})
