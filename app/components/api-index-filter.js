import { computed } from '@ember/object';
import Component from '@ember/component';
import sortBy from 'lodash.sortby';

const filterDataComputedParams = 'filterData.{showInherited,showProtected,showPrivate,showDeprecated}';

export default Component.extend({
  classNames: ['api-index-filter'],

  filteredMethods: computed('model.methods.[]', filterDataComputedParams,
    function() {
      return this.filterItems('methods');
    }),

  filteredEvents: computed('model.events.[]', filterDataComputedParams,
    function() {
      return this.filterItems('events');
    }),

  filteredProperties: computed('model.properties.[]', filterDataComputedParams,
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

    let sortedItems = sortBy(items, (item => item.name));
    return this.filterMultipleInheritance(sortedItems);
  },

  filteredData: computed('filteredMethods', 'filteredProperties', 'filteredEvents', function() {
    return {
      methods: this.filteredMethods,
      properties: this.filteredProperties,
      events: this.filteredEvents
    };
  }),

  /**
  * Returns an array where duplicate methods (by name) are removed.
  * The docs for the nearest inheritance are typically more helpful to users,
  * so in cases of duplicates, "more local" is preferred.
  * Without this, multiple entries for some methods will show up.
  * @method filterMultipleInheritance
  */
  filterMultipleInheritance(items) {
    let dedupedArray = [];
    for (let i = 0; i < items.length; i++) {
      let currentItem = items[i];
      if (i === items.length - 1) {
        // if it's the last item, keep it
        dedupedArray.push(currentItem);
      } else {
        let nextItem = items[i + 1];
        if (currentItem.name === nextItem.name) {
          // if the method would be listed twice, find the more local documentation
          let mostLocal = this.findMostLocal(currentItem, nextItem)
          dedupedArray.push(mostLocal);
          i += 1; // skip the next item with duplicate name
        } else {
          dedupedArray.push(currentItem);
        }
      }
    }
    return dedupedArray;
  },
  /**
  * Returns whichever item is most local.
  * What is "most local" is determined by looking at the file path for the
  * method, the file path for the class being viewed, and the parent if needed.
  * @method findMostLocal
  */
  findMostLocal(currentItem, nextItem) {
    let currentScope = this.get('model.file');
    let parentClassScope = this.get('model.parentClass.file');
    if (currentScope === currentItem.file) {
      // if the item belongs to the class, keep it
      return currentItem;
    } else if (parentClassScope === currentItem.file) {
      // or if the item belongs to the parent class, keep it
      return currentItem;
    } else {
      // otherwise, the next item must be "more local"
      return nextItem;
    }
  }
})
