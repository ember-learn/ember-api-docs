import Service, { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class SearchService extends Service {
  @service('algolia') _algoliaService;
  @service('project') projectService;

  /** @type {?string} */
  #lastQueriedProjectVersion = null;

  @tracked results = [];

  get projectVersion() {
    return this.projectService.version;
  }

  search = restartableTask(async (query) => {
    const projectVersion = this.projectVersion;

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

    this.#lastQueriedProjectVersion = projectVersion;

    this.results = await this.doSearch(searchObj, params);
    return this.results;
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
      this.#lastQueriedProjectVersion !== null &&
      this.projectVersion !== this.#lastQueriedProjectVersion
    );
  }

  clearResults() {
    this.results = [];
  }
}
