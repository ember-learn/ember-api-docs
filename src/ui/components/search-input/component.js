import Ember from 'ember';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {task, timeout} from 'ember-concurrency';

const SEARCH_DEBOUNCE_PERIOD = 300;

export default Ember.Component.extend({
  // Public API
  value: '',

  _searchClient: Ember.inject.service('algolia'),

  // Private API
  classNames: ['search-input'],
  _projectService: Ember.inject.service('project'),
  _projectVersion: Ember.computed.alias('_projectService.standardisedVersion'),
  _results: Ember.A(),
  _focused: false,
  _resultTetherConstraints: [
    {
      to: 'window',
      pin: ['left','right']
    }
  ],

  search: task(function * (query) {

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    const client = get(this, '_searchClient');
    const projectVersion = get(this, '_projectVersion');

    // Hide and don't run query if there's no search query
    // if (!query) {
    //   return set(this, '_focused', false);
    // }

    const params = {
      hitsPerPage: 15,
      restrictSearchableAttributes: ['hierarchy.lvl0', 'hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3', 'hierarchy.lvl4'],
      facetFilters: [[`version:${projectVersion}`,'tags:api']]
    };

    const searchObj = {
      indexName: 'emberjs_versions',
      query
    };

    let searchFn = Ember.RSVP.denodeify(client.search.bind(client));
    let res = yield searchFn(searchObj, params);

    const results = get(res, 'hits');
    return get(this, '_results')
      .clear()
      .addObjects(results);
  }).restartable(),

  actions: {

    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      Ember.run.later(this, function () {
        set(this, '_focused', false);
      }, 200);
    }

  }
});
