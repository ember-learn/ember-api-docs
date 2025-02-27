/* eslint-disable ember/no-get */
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { get } from '@ember/object';
import { isPresent } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default class SearchInput extends Component {
  @tracked query = '';
  @tracked _focused = false;

  @service('search') searchService;

  _resultTetherConstraints = null;

  constructor() {
    super(...arguments);

    this._resultTetherConstraints = [
      {
        to: 'window',
        pin: ['left', 'right'],
      },
    ];
  }

  get queryIsPresent() {
    return isPresent(this.query);
  }

  @task({ restartable: true }) *search(query) {
    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    this.query = query;

    // Hide and don't run query if there's no search query
    if (!query) {
      this._focused = false;
      return;
    }

    // ensure search results are visible if the menu was previously closed above
    this._focused = true;

    yield get(this, 'searchService.search').perform(query);
  }

  @task *closeMenu() {
    yield timeout(SEARCH_CLOSE_PERIOD);

    this._focused = false;
  }

  @action onfocus() {
    if (this.query.length > 0 && this.searchService.hasStaleResults()) {
      // clearing the results avoids a flash of stale content while the search
      // is performed
      this.searchService.clearResults();
      this.searchService.search.perform(this.query);
    }

    this._focused = true;
  }

  @action onblur() {
    this.closeMenu.perform();
  }
}
