import Service from '@ember/service';
import algoliaSearch from 'algoliasearch/lite';
import config from 'ember-api-docs/config/environment';

export default class AlgoliaService extends Service {
  constructor() {
    super(...arguments);
    this.indexes = {};
    this.client = algoliaSearch(config.algolia.algoliaId, config.algolia.algoliaKey);
  }

  search(query, params = undefined) {
    if (!query) {
      return Promise.reject(`Could not search algolia for query "${query}"`);
    }

    if (Array.isArray(query) && !params) {
      // if multiple indices
      return this.client.search(query);
    }

    if (!params) {
      return this.accessIndex(query.indexName).search(query.query);
    }

    return this.accessIndex(query.indexName).search(query.query, params);
  }

  accessIndex(indexName) {
    if (!this.indexes[indexName]) {
      this.indexes[indexName] = this.client.initIndex(indexName);
    }

    return this.indexes[indexName];
  }
}
