/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import algoliasearch from 'algoliasearch';
import config from 'ember-api-docs/config/environment';

export default class AlgoliaService extends Service {
  async search(query, params) {
    if (query) {
      if (Array.isArray(query) && !params) {
        // if multiple indices
        return this._client.search(query);
      } else if (!params) {
        // if no params
        return this.accessIndex(query.indexName).search(query.query);
      } else {
        // if params and callback
        return this.accessIndex(query.indexName).search(query.query, params);
      }
    }
  }

  accessIndex(IndexName) {
    if (!this._indices[IndexName]) {
      this._indices[IndexName] = this._client.initIndex(IndexName);
    }
    return this._indices[IndexName];
  }

  constructor() {
    super(...arguments);
    this._client = algoliasearch(
      config.algolia.algoliaId,
      config.algolia.algoliaKey
    );
    this._indices = {};
  }
}
