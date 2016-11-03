import Ember from 'ember';
import _ from 'lodash/lodash';

const { computed } = Ember;


export default Ember.Controller.extend({
  filteredMethods: computed('model.methods.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('methods');
  }),

  filteredEvents: computed('model.events.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('events');
  }),

  filteredProperties: computed('model.properties.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('properties');
  }),

  filterItems(itemType) {
    let items = this.get('model.' + itemType);
    if (!this.get('showInherited')) {
      items = items.filter(item => item.inherited !== true);
    }
    if (!this.get('showProtected')) {
      items = items.filter(item => item.access !== 'protected');
    }
    if (!this.get('showPrivate')) {
      items = items.filter(item => item.access !== 'private');
    }
    if (!this.get('showDeprecated')) {
      items = items.filter(item => item.deprecated !== true);
    }
    return _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
  }
});
