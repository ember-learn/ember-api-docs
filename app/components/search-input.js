import Ember from 'ember';
import algoliasearch from 'npm:algoliasearch';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
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
  _focused: false,
  _resultTetherConstraints: [
    {
      to: 'window',
      pin: ['left','right']
    }
  ],
  actions: {
    search(query) {
      const client = get(this, '_searchClient');
      const projectVersion = get(this, '_projectVersion');

      // Hide and don't run query if there's no search query
      // if (!query) {
      //   return set(this, '_focused', false);
      // }

      const queries = [
        {
          indexName: 'emberjs_versions',
          query,
          params: {
            restrictSearchableAttributes: ['hierarchy.lvl0', 'hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3', 'hierarchy.lvl4'],
            facetFilters: [[`version:${projectVersion}`,'tags:api']]
          }
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
