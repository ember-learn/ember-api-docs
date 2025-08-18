import Service, { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency';
import { set } from '@ember/object';
import { A as emberArray } from '@ember/array';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';

export default class SearchService extends Service {
  @service('algolia') _algoliaService;
  @service('project') _projectService;

  @alias('_projectService.version') _projectVersion;

  /** @type {?string} */
  _lastQueriedProjectVersion = null;

  results = emberArray();

  search = restartableTask(async (query) => {
    const projectVersion = this._projectVersion;

    const params = {
      hitsPerPage: 15,
      restrictSearchableAttributes: [
        'hierarchy.lvl0',
        'hierarchy.lvl1',
        'hierarchy.lvl2',
      ],
      tagFilters: [`version:${projectVersion}`],
      facetFilters: ['access:-private'],
    };

    const searchObj = {
      indexName: 'methods',
      query,
    };

    this._lastQueriedProjectVersion = projectVersion;

    return set(this, 'results', await this.doSearch(searchObj, params));
  });

  doSearch(searchObj, params) {
    return this._algoliaService
      .search(searchObj, params)
      .then((results) => results.hits);
  }

  /**
   * Whenever the version changes in service:project, the results in this
   * service become stale. Presenting them any further could allow the user to
   * undo their version change by clicking a stale link.
   * @returns {boolean}
   */
  hasStaleResults() {
    return (
      this._lastQueriedProjectVersion !== null &&
      this._projectVersion !== this._lastQueriedProjectVersion
    );
  }

  clearResults() {
    set(this, 'results', emberArray());
  }
}
