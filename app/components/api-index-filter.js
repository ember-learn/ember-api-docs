import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({

  methods: Ember.computed('itemData.methods',
                          'filterData.showInherited',
                          'filterData.showPrivate',
                          'filterData.showProtected',
                          'filterData.showDeprecated', function () {
    return this._filterItems(this.get('itemData.methods'), this.get('filterData'));
  }),

  properties: Ember.computed('itemData.properties', function () {
    return this._filterItems(this.get('itemData.properties'), this.get('filterData'));
  }),

  events: Ember.computed('itemData.events', function () {
    return this._filterItems(this.get('itemData.events'), this.get('filterData'));
  }),

  filteredItemData: Ember.computed('methods', 'properties', 'events', function () {
    let filteredItemData = Ember.Object.create(this.get('itemData'));
    filteredItemData.set('methods', this.get('methods'));
    filteredItemData.set('properties', this.get('properties'));
    filteredItemData.set('events', this.get('events'));
    return filteredItemData;
  }),

  _filterItems(items, filterData) {
    if (!filterData.get('showInherited')) {
      items = items.filter(item => item.inherited !== true);
    }
    if (!filterData.get('showProtected')) {
      items = items.filter(item => item.access !== 'protected');
    }
    if (!filterData.get('showPrivate')) {
      items = items.filter(item => item.access !== 'private');
    }
    if (!filterData.get('showDeprecated')) {
      items = items.filter(item => item.deprecated !== true);
    }
    return _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
  }

});
