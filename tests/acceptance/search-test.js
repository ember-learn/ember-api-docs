import { module, skip } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import searchResults from 'ember-api-docs/tests/fixtures/searchresult';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  skip('search for an EmberArray function and navigate properly', async function (assert) {
    await visit('/');

    const algoliaService = this.owner.lookup('service:algolia');

    algoliaService.search = async () => {
      return searchResults;
    };

    await fillIn('[data-test-search-input]', 'forEach');

    await click('[data-test-search-result]');

    assert.equal(
      currentURL(),
      '/ember/4.1/classes/EmberArray/methods/forEach?anchor=forEach'
    );
  });
});
