import { denodeify } from 'rsvp';
import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default Component.extend({
  // Public API
  value: '',

  _searchClient: service('algolia'),

  // Private API
  classNames: ['search-input'],
  _projectService: service('project'),
  _projectVersion: alias('_projectService.version'),
  _results: A(),
  _focused: false,
  _resultTetherConstraints: Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]),

  search: task(function * (query) {

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    const client = get(this, '_searchClient');
    const projectVersion = get(this, '_projectVersion');

    // Hide and don't run query if there's no search query
    if (!query) {
      return set(this, '_focused', false);
    }

    // ensure search results are visible if the menu was previously closed above
    set(this, '_focused', true);

    const params = {
      hitsPerPage: 15,
      restrictSearchableAttributes: [
        'hierarchy.lvl0',
        'hierarchy.lvl1',
        'hierarchy.lvl2'
      ],
      tagFilters: [`version:${projectVersion}`],
      facetFilters: ['access:public']
    };

    const searchObj = {
      indexName: 'methods',
      query
    };

    let searchFn = denodeify(client.search.bind(client));
    let res = yield searchFn(searchObj, params);

    const results = get(res, 'hits');
    return get(this, '_results')
      .clear()
      .addObjects(results);
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
      this.get('closeMenu').perform();
    }

  }
});
