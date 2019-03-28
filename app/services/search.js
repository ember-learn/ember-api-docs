import Service from '@ember/service';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { A as emberArray } from '@ember/array';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { denodeify } from 'rsvp';

export default Service.extend({

  _searchClient: service('algolia'),
  _projectService: service('project'),
  _projectVersion: alias('_projectService.version'),

  results: emberArray(),

  search: task(function * (query) {
    const projectVersion = get(this, '_projectVersion');

    const params = {
      hitsPerPage: 15,
      restrictSearchableAttributes: [
        'hierarchy.lvl0',
        'hierarchy.lvl1',
        'hierarchy.lvl2'
      ],
      tagFilters: [`version:${projectVersion}`],
      facetFilters: ['access:-private']
    };

    const searchObj = {
      indexName: 'methods',
      query
    };

    return set(this, 'results', yield this.doSearch(searchObj, params));

  }).restartable(),

  doSearch(searchObj, params) {
    const client = get(this, '_searchClient');
    const searchFn = denodeify(client.search.bind(client));
    return searchFn(searchObj, params).then((results) => {
      return get(results, 'hits');
    });
  }
});
