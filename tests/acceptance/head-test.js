import { visit } from '@ember/test-helpers';
import ENV from 'ember-api-docs/config/environment';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | head', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.head = document.querySelector('head')
  });

  test('no link rel=canonical for release url', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert.dom('link[rel=canonical]', this.head).doesNotExist();
  });

  test('shows link rel=canonical for version url', async function(assert) {
    await visit('/ember/2.16/classes/Application');
    assert.dom('link[rel=canonical]', this.head).hasAttribute('href');
  });

  test('no link rel=canonical when root url visited', async function(assert) {
    await visit('/');
    assert.dom('link[rel=canonical]', this.head).doesNotExist();

  });

  test('dns prefetch should be populated', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert.dom('link[rel=dns-prefetch]', this.head).hasAttribute('href', ENV.API_HOST);
  });

  test('dns prefetch should be populated when root url visited', async function(assert) {
    await visit('/');
    assert.dom('link[rel=dns-prefetch]', this.head).hasAttribute('href', ENV.API_HOST);
  });
});
