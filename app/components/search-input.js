import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default Component.extend({
  query: '',

  classNames: ['search-input'],
  searchService: service('search'),

  _results: A(),
  _focused: false,
  _resultTetherConstraints: null,

  init() {
    this._resultTetherConstraints = [
      {
        to: 'window',
        pin: ['left','right']
      }
    ];
    this._super(...arguments);
  },

  noResults: computed('query', 'searchService.{results.[],search.isRunning}', function() {
    if (get(this, 'searchService.search.isRunning')) {
      return false;
    }
    return isPresent(this.query) && isEmpty(get(this, 'searchService.results'));
  }),

  search: task(function * (query) {

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    set(this, 'query', query);

    // Hide and don't run query if there's no search query
    if (!query) {
      return set(this, '_focused', false);
    }

    // ensure search results are visible if the menu was previously closed above
    set(this, '_focused', true);

    yield get(this, 'searchService.search').perform(query);

  }).restartable(),

  closeMenu: task(function * () {
    yield timeout(SEARCH_CLOSE_PERIOD);

    set(this, '_focused', false);
  }),

  actions: {

    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      this.closeMenu.perform();
    }

  }
});
