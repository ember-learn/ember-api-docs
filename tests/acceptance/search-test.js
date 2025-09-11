import { module, test } from 'qunit';
import { visit, fillIn, focus } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';
import Selectors from '../helpers/search-selectors';
import searchResultsV4_1 from 'ember-api-docs/tests/fixtures/searchresult-v-4-1';
import searchResultsV5_1 from 'ember-api-docs/tests/fixtures/searchresult-v-5-1';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  test('search for an EmberArray function and navigate properly', async function (assert) {
    await visit('/');

    const algoliaService = this.owner.lookup('service:algolia');

    algoliaService.search = async () => {
      return searchResultsV4_1;
    };

    await fillIn(Selectors.input, 'forEach');

    assert
      .dom(Selectors.searchResult)
      .hasAttribute('href', '/ember/4.1/classes/EmberArray#forEach');
  });

  test('discards stale search results when version changes', async function (assert) {
    await visit('/');

    const algoliaService = this.owner.lookup('service:algolia');

    algoliaService.search = async () => {
      return searchResultsV4_1;
    };

    await selectChoose('.ember-power-select-trigger', '4.1');

    await fillIn(Selectors.input, 'forEach');

    // the url contains /ember/4.1/
    assert.dom(Selectors.searchResult).hasAttribute('href', /\/ember\/4\.1\//);

    algoliaService.search = async () => {
      return searchResultsV5_1;
    };

    await selectChoose('.ember-power-select-trigger', '5.1');

    await focus(Selectors.input);

    // the url contains /ember/5.1/
    assert.dom(Selectors.searchResult).hasAttribute('href', /\/ember\/5\.1\//);
  });
});
