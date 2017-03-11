import Ember from 'ember';
import algoliasearch from 'npm:algoliasearch';
import get from 'ember-metal/get';
import config from 'ember-api-docs/config/environment';

export default Ember.Component.extend({
  // Public API
  value: '',

  // Private API
  classNames: ['search-input'],
  _searchClient: algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY),
  _projectService: Ember.inject.service('project'),
  _projectVersion: Ember.computed.alias('_projectService.standardisedVersion'),
  _results: Ember.A(),
  _groupedResults: Ember.computed('_results.[]', function () {
    return get(this, '_results').reduce((previous, current) => {
      const lvl0 = get(current, 'hierarchy.lvl0').toLowerCase();
      // If lvl0 doesn't exist in the resulting object, create the array
      if (!previous[lvl0]) {
        previous[lvl0] = Ember.A();
      }
      // Insert the current item into the resulting object.
      previous[lvl0].addObject(current);
      return previous;
    }, {});
  }),

  actions: {
    search(query) {
      const client = get(this, '_searchClient');
      const projectVersion = get(this, '_projectVersion');
      const queries = [
        {
          indexName: 'emberjs_versions',
          query,
          facetFilters: [[`version:${projectVersion}`,'tags:api']]
        }
      ];

      return client
        .search(queries)
        .then(res => {
          const results = get(res, 'results.0.hits');
          return get(this, '_results')
            .clear()
            .addObjects(results);
        });
    },
    clearResults() {
      get(this, '_results').clear();
    }
  }
});
