import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  fillIn,
  render,
  waitUntil,
  click,
  triggerKeyEvent,
  tab,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Selectors from '../../helpers/search-selectors';

const SearchResponse = [
  {
    file: 'packages/ember-routing/lib/system/route.js',
    line: 1505,
    module: '@ember/routing',
    class: 'Route',
    name: 'model',
    access: 'public',
    _tags: ['module:@ember/routing', 'version:3.5.1', 'since:3.5.1'],
    hierarchy: { lvl0: '@ember/routing', lvl1: 'Route', lvl2: 'model' },
    objectID: '180742570',
    _highlightResult: {
      name: {
        value: '<em>model</em>',
        matchLevel: 'full',
        fullyHighlighted: true,
        matchedWords: ['model'],
      },
      hierarchy: {
        lvl0: {
          value: '@ember/routing',
          matchLevel: 'none',
          matchedWords: [],
        },
        lvl1: { value: 'Route', matchLevel: 'none', matchedWords: [] },
        lvl2: {
          value: '<em>model</em>',
          matchLevel: 'full',
          fullyHighlighted: true,
          matchedWords: ['model'],
        },
      },
    },
  },
  {
    file: 'packages/ember-routing/lib/system/route.js',
    line: 1505,
    module: '@ember/routing',
    class: 'Route',
    name: 'model',
    access: 'public',
    _tags: ['module:@ember/routing', 'version:3.5.1', 'since:3.5.1'],
    hierarchy: { lvl0: '@ember/routing', lvl1: 'Route', lvl2: 'model' },
    objectID: '168075472',
    _highlightResult: {
      name: {
        value: '<em>model</em>',
        matchLevel: 'full',
        fullyHighlighted: true,
        matchedWords: ['model'],
      },
      hierarchy: {
        lvl0: {
          value: '@ember/routing',
          matchLevel: 'none',
          matchedWords: [],
        },
        lvl1: { value: 'Route', matchLevel: 'none', matchedWords: [] },
        lvl2: {
          value: '<em>model</em>',
          matchLevel: 'full',
          fullyHighlighted: true,
          matchedWords: ['model'],
        },
      },
    },
  },
  {
    file: 'packages/ember-routing/lib/system/route.js',
    line: 1879,
    module: '@ember/routing',
    class: 'Route',
    name: 'modelFor',
    access: 'public',
    _tags: ['module:@ember/routing', 'version:3.5.1', 'since:3.5.1'],
    hierarchy: {
      lvl0: '@ember/routing',
      lvl1: 'Route',
      lvl2: 'modelFor',
    },
    objectID: '180742650',
    _highlightResult: {
      name: {
        value: '<em>model</em>For',
        matchLevel: 'full',
        fullyHighlighted: false,
        matchedWords: ['model'],
      },
      hierarchy: {
        lvl0: {
          value: '@ember/routing',
          matchLevel: 'none',
          matchedWords: [],
        },
        lvl1: { value: 'Route', matchLevel: 'none', matchedWords: [] },
        lvl2: {
          value: '<em>model</em>For',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['model'],
        },
      },
    },
  },
  {
    file: 'packages/ember-routing/lib/system/route.js',
    line: 1879,
    module: '@ember/routing',
    class: 'Route',
    name: 'modelFor',
    access: 'public',
    _tags: ['module:@ember/routing', 'version:3.5.1', 'since:3.5.1'],
    hierarchy: {
      lvl0: '@ember/routing',
      lvl1: 'Route',
      lvl2: 'modelFor',
    },
    objectID: '168075552',
    _highlightResult: {
      name: {
        value: '<em>model</em>For',
        matchLevel: 'full',
        fullyHighlighted: false,
        matchedWords: ['model'],
      },
      hierarchy: {
        lvl0: {
          value: '@ember/routing',
          matchLevel: 'none',
          matchedWords: [],
        },
        lvl1: { value: 'Route', matchLevel: 'none', matchedWords: [] },
        lvl2: {
          value: '<em>model</em>For',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['model'],
        },
      },
    },
  },
];

module('Integration | Component | api search', function (hooks) {
  setupRenderingTest(hooks);

  test('search hits display content', async function (assert) {
    let searchService = this.owner.lookup('service:search');

    let projectService = this.owner.lookup('service:project');
    projectService.version = '5.1.2';

    searchService.doSearch = () => {
      return SearchResponse;
    };

    await render(hbs`<ApiSearch />`);

    await fillIn(Selectors.input, 'model');

    assert.dom(Selectors.dropdown).isVisible();
    assert.dom(Selectors.searchResult).exists({ count: 4 });
    assert
      .dom(Selectors.screenReaderContent)
      .hasText('4 results found for "model"');

    assert
      .dom(Selectors.searchLabel)
      .hasText(
        'Search v5.1.2 of the API Docs. Results will update as you type.',
      );

    assert
      .dom(Selectors.searchLabel)
      .hasClass(
        'screen-reader-text',
        'Label is only visible to screen readers',
      );

    assert.dom(Selectors.dropdown).hasAttribute('aria-label', 'Search Results');

    assert
      .dom(Selectors.screenReaderContent)
      .hasAttribute('aria-live', 'polite')
      .hasAttribute('aria-atomic', 'true');
  });

  test('no search hits display no results', async function (assert) {
    let searchService = this.owner.lookup('service:search');

    searchService.doSearch = () => {
      return [];
    };

    await render(hbs`<ApiSearch />`);

    await fillIn(Selectors.input, 'model');

    assert.dom(Selectors.noResults).includesText('No Results Found');
    assert.dom(Selectors.screenReaderContent).hasText('No results found');
  });

  test('dropdown shows previous search results when input is focused', async function (assert) {
    let searchService = this.owner.lookup('service:search');
    searchService.doSearch = () => {
      return SearchResponse;
    };

    await render(hbs`<ApiSearch /><button>Bar</button>`);
    await fillIn(Selectors.input, 'foo');

    assert.dom(Selectors.dropdown).isVisible('Dropdown opens on search');
    assert.dom(Selectors.searchResult).exists({ count: 4 });

    await click('button');
    assert
      .dom(Selectors.dropdown)
      .isNotVisible(
        'Dropdown closed after clicking outside search dropdown and input',
      );

    await click(Selectors.input);

    assert
      .dom(Selectors.dropdown)
      .isVisible('Dropdown opens on focus after previous search');
    assert.dom(Selectors.searchResult).exists({ count: 4 });
  });

  test('can navigate results via keyboard', async function (assert) {
    let searchService = this.owner.lookup('service:search');
    searchService.doSearch = () => {
      return SearchResponse;
    };

    await render(hbs`<ApiSearch />`);
    await fillIn(Selectors.input, 'foo');
    assert.dom(Selectors.dropdown).isVisible();

    // Simulate tabbing from input to first result
    await tab();
    const results = document.querySelectorAll(Selectors.searchResult);
    assert.dom(results[0]).isFocused('Tab moves focus to result');

    await triggerKeyEvent(results[0], 'keydown', 'Escape');
    assert
      .dom(Selectors.dropdown)
      .isNotVisible('Search results close on hitting Escape');

    assert.dom(Selectors.input).isFocused('Focus returns to input');
  });

  test('dropdown closes on tabbing out of the results', async function (assert) {
    let searchService = this.owner.lookup('service:search');
    searchService.doSearch = () => {
      return SearchResponse;
    };

    await render(hbs`<ApiSearch /><a href="#">Another thing to tab to</a>`);
    await fillIn(Selectors.input, 'foo');
    assert.dom(Selectors.dropdown).isVisible();

    // Tab to first result
    await tab();
    // Tab out of dropdown (simulate enough tabs to leave dropdown)
    await tab();
    await tab();
    await tab();
    await tab();
    await tab();

    await waitUntil(() => !document.querySelector(Selectors.dropdown));

    assert
      .dom(Selectors.dropdown)
      .doesNotExist('Dropdown closes on tabbing out');
  });
});
