import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import { restartableTask, task, timeout } from 'ember-concurrency';
import { modifier } from 'ember-modifier';

const closeOnFocusOutside = modifier(function closeOnFocusOut(
  element,
  [onClose],
) {
  function handleFocus(event) {
    if (!element.contains(event.target)) {
      onClose();
    }
  }

  window.addEventListener('focusin', handleFocus);

  return () => {
    window.removeEventListener('focusin', handleFocus);
  };
});

const closeOnEscape = modifier(function closeOnFocusOut(
  element,
  [onClose, isOpen],
) {
  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      onClose();
      let input = element.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  }

  window.addEventListener('keydown', handleKeydown);

  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
});

const closeOnClickOutside = modifier(function closeOnClickOutside(
  element,
  [onClose],
) {
  function handleClick(event) {
    if (!element.contains(event.target)) {
      onClose();
    }
  }

  window.addEventListener('mousedown', handleClick);

  return () => {
    window.removeEventListener('mousedown', handleClick);
  };
});

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default class Search extends Component {
  @tracked query = '';
  @tracked isOpen = false;

  guid = guidFor(this);

  get searchService() {
    return this.args.searchService;
  }

  get queryIsPresent() {
    return this.query && this.query?.trim().length >= 0;
  }

  get noResults() {
    return (
      this.queryIsPresent &&
      !this.searchService.search.isRunning &&
      this.searchService.results.length === 0
    );
  }

  get resultsId() {
    return `search-results-${this.guid}`;
  }

  get searchInputId() {
    return `search-input-${this.guid}`;
  }

  onfocus = () => {
    if (this.query.length > 0 && this.searchService.hasStaleResults()) {
      // clearing the results avoids a flash of stale content while the search
      // is performed
      this.searchService.clearResults();
      this.searchService.search.perform(this.query);
    }

    if (this.queryIsPresent) {
      this.isOpen = true;
    }
  };

  onblur = () => {
    this.closeMenu.perform();
  };

  closeMenu = task(async () => {
    await timeout(SEARCH_CLOSE_PERIOD);

    this.isOpen = false;
  });

  submitSearch = (e) => {
    e.preventDefault();
    this.isOpen = true;
  };

  search = restartableTask(async (event) => {
    await timeout(SEARCH_DEBOUNCE_PERIOD);

    this.query = event.target.value;

    // Hide and don't run query if there's no search query
    if (!this.queryIsPresent) {
      return;
    }

    this.isOpen = true;

    await this.searchService.search.perform(this.query);
  });

  <template>
    <div
      class='search-wrapper'
      {{closeOnFocusOutside this.closeMenu.perform}}
      {{closeOnEscape this.closeMenu.perform this.isOpen}}
      {{closeOnClickOutside this.closeMenu.perform}}
      ...attributes
    >
      <form
        role='search'
        {{on 'submit' this.submitSearch}}
        data-test-search-form
      >
        <label
          for='{{this.searchInputId}}'
          class='screen-reader-text'
          data-test-search-label
        >
          {{yield to='searchInputScreenReaderLabel'}}
        </label>
        <input
          class='search-input'
          id='{{this.searchInputId}}'
          type='search'
          {{on 'input' this.search.perform}}
          {{on 'focus' this.onfocus}}
          autocomplete='off'
          autocorrect='off'
          autocapitalize='off'
          spellcheck={{false}}
          placeholder='Search'
          aria-controls={{if this.isOpen this.resultsId}}
          aria-owns={{if this.isOpen this.resultsId}}
          aria-expanded={{if this.isOpen 'true' 'false'}}
          data-test-search-input
        />
      </form>
      {{#if this.isOpen}}
        <div
          id='{{this.resultsId}}'
          class='search-results'
          aria-label='Search Results'
          data-test-search-dropdown
        >
          <div
            class='screen-reader-text'
            aria-live='polite'
            aria-atomic='true'
            data-test-screen-reader
          >
            {{#if this.noResults}}
              No results found
            {{else if this.queryIsPresent}}
              {{this.searchService.results.length}}
              results found for "{{this.query}}"
            {{/if}}
          </div>
          {{#if this.searchService.search.isRunning}}
            <div class='search-results--searching'>
              Searching...
            </div>
          {{else if this.noResults}}
            <div class='search-results--no-results' data-test-search-no-results>
              No Results Found.
              <p>Try searching the
                <a
                  href='https://www.emberjs.com/deprecations/'
                  target='_deprecations'
                >deprecations guide</a>.</p>
            </div>
          {{else if this.queryIsPresent}}
            {{yield
              this.searchService.results
              this.closeMenu.perform
              to='results'
            }}
          {{else}}
            <div class='search-results--instructions'>
              {{yield to='instructions'}}
            </div>
          {{/if}}
          <div class='powered-by-algolia'>
            <a
              href='https://www.algolia.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/assets/images/search-by-algolia.svg'
                alt='Search Powered by Algolia'
              />
            </a>
          </div>
        </div>
      {{/if}}
    </div>
  </template>
}
