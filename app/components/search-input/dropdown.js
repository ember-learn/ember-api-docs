import Ember from 'ember';

const { get, A } = Ember;

export default Ember.Component.extend({
  // Public API
  role: 'listbox',
  results: A(),

  // Private API
  tagName: 'span',
  classNames: ['ds-dropdown-menu','ds-with-1'],
  attributeBindings: ['role'],

  // Hide the dropdown if there's no results
  isVisible: Ember.computed.gt('results.length', 0),

  // Massage data to make it easier for displaying on the template
  // Returned object:
  /**
   *  {
   *    lvl0Key: {
   *      lvl1Key: algoliaHit
   *    }
   *  }
   */
  _groupedResults: Ember.computed('results.[]', function () {
    if (!get(this, 'results.length')) {
      return {};
    }

    const lvl0Group = get(this, 'results').reduce((previous, current) => {
      // Remap all lowercase usages of 'guides' to 'Guides'
      let lvl0 = Ember.String.capitalize(get(current, 'hierarchy.lvl0'));
      // If lvl0 doesn't exist in the resulting object, create the array
      if (!previous[lvl0]) {
        previous[lvl0] = Ember.A();
      }
      // Insert the current item into the resulting object.
      previous[lvl0].addObject(current);
      return previous;
    }, {});

    /*
    lvl0Group = {
      lvl0key: algoliaHit
    }
    */

    // Iterate over every lvl0 group, group by lvl1
    return Object.keys(lvl0Group).reduce((lvl0Result, lvl0Key) => {
      // Inject lvl1 grouped results into lvl0
      lvl0Result[lvl0Key] = lvl0Group[lvl0Key].reduce((lvl1Result, lvl1Item) => {
        // lvl1 is sometimes null. Normalise to a string.
        const lvl1Value = get(lvl1Item, 'hierarchy.lvl1');
        const lvl1Key = lvl1Value? lvl1Value : lvl0Key;

        if (!lvl1Result[lvl1Key]) {
          lvl1Result[lvl1Key] = Ember.A();
        }

        lvl1Result[lvl1Key].addObject(lvl1Item);
        return lvl1Result;
      }, {});

      return lvl0Result;
    }, {});
  })
});
