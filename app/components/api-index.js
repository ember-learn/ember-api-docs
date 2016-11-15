import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  itemData: Ember.T,
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,

  sections: Ember.computed('itemData', 'itemData.methods.[]', 'itemData.properties.[]', 'itemData.events.[]', function () {
    return [
      {
        title: 'Methods',
        items: this.get('methods'),
        class: 'api-methods'
      },
      {
        title: 'Properties',
        items: this.get('properties'),
        class: 'api-properties'
      },
      {
        title: 'Events',
        items: this.get('events'),
        class: 'api-events'
      }
    ];
  }),

  filterCriteria: Ember.computed('showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function () {
    return {
      isInherited: this.get('showInherited'),
      isProtected: this.get('showProtected'),
      isPrivate: this.get('showPrivate'),
      isDeprecated: this.get('showDeprecated')
    };
  }),

  methods: Ember.computed('itemData.methods', 'filterCriteria', function () {
    return this._filterItems(this.get('itemData.methods'), this.get('filterCriteria'));
  }),

  properties: Ember.computed('itemData.properties', function () {
    return this._filterItems(this.get('itemData.properties'), this.get('filterCriteria'));
  }),

  events: Ember.computed('itemData.events', function () {
    return this._filterItems(this.get('itemData.events'), this.get('filterCriteria'));
  }),

  _filterItems(items, filterCriteria) {
    if (!filterCriteria.isInherited) {
      items = items.filter(item => item.inherited !== true);
    }
    if (!filterCriteria.isProtected) {
      items = items.filter(item => item.access !== 'protected');
    }
    if (!filterCriteria.isPrivate) {
      items = items.filter(item => item.access !== 'private');
    }
    if (!filterCriteria.isDeprecated) {
      items = items.filter(item => item.deprecated !== true);
    }
    return _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
  }

});
