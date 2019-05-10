import Service from '@ember/service';
import algoliasearch from 'algoliasearch';
import config from 'ember-api-docs/config/environment';
import { denodeify } from 'rsvp';

export default Service.extend({
  _search(query, params, callback) {
    if (!callback) {
      callback = params;
      params = undefined;
    }
    if (query) {
      if (Array.isArray(query) && !params) { // if multiple indices
        this._client.search(query, callback);
      } else if (!params) { // if no params
        this.accessIndex(query.indexName).search(query.query, callback);
      } else { // if params and callback
        this.accessIndex(query.indexName).search(query.query, params, callback);
      }
    } else {
      callback(new Error(`Could not search algolia for query "${query}"`));
    }
  },

  accessIndex(IndexName) {
    if (!this._indices[IndexName]) {
      this._indices[IndexName] = this._client.initIndex(IndexName);
    }
    return this._indices[IndexName];
  },

  init() {
    this._super(...arguments);
    this._client = algoliasearch(config.algolia.algoliaId, config.algolia.algoliaKey);
    this._indices = {};
    this.search = denodeify(this._search.bind(this));
  }
});
