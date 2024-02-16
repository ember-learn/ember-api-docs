import { module, skip, test } from 'qunit';
import { visit, currentURL, fillIn, click, focus } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';

import searchResultsV4_1 from 'ember-api-docs/tests/fixtures/searchresult-v-4-1';
import searchResultsV5_1 from 'ember-api-docs/tests/fixtures/searchresult-v-5-1';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  skip('search for an EmberArray function and navigate properly', async function (assert) {
    await visit('/');

    const algoliaService = this.owner.lookup('service:algolia');

    algoliaService.search = async () => {
      return searchResultsV4_1;
    };

    await fillIn('[data-test-search-input]', 'forEach');

    await click('[data-test-search-result]');

    assert.equal(
      currentURL(),
      '/ember/4.1/classes/EmberArray/methods/forEach?anchor=forEach'
    );
  });

  test('discard stale search results when version changes', async function (assert) {
    await visit('/');

    const algoliaService = this.owner.lookup('service:algolia');

    algoliaService.search = async () => {
      return searchResultsV4_1;
    };

    await selectChoose('.ember-power-select-trigger', '4.1');

    await fillIn('[data-test-search-input]', 'forEach');

    // the url contains /ember/4.1/
    assert
      .dom('[data-test-search-result]')
      .hasAttribute('href', /\/ember\/4\.1\//);

    algoliaService.search = async () => {
      return searchResultsV5_1;
    };

    await selectChoose('.ember-power-select-trigger', '5.1');

    await focus('[data-test-search-input]');

    // the url contains /ember/5.1/
    assert
      .dom('[data-test-search-result]')
      .hasAttribute('href', /\/ember\/5\.1\//);
  });
});
