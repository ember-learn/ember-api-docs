import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | head', function(hooks) {
  setupApplicationTest(hooks);

  //NOTE: ember-cli-head sets the meta on test document head, so tests wont work if we pass string selectors to qunit-dom
  let domSel = document.querySelector;

  test('no link rel=canonical for release url', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert.dom(domSel('head link[rel=canonical]')).doesNotExist();
  });

  test('shows link rel=canonical for version url', async function(assert) {
    await visit('/ember/2.16/classes/Application');
    assert.dom(domSel('head link[rel=canonical]')).hasAttribute('href');
  });

  test('no link rel=canonical when root url visited', async function(assert) {
    await visit('/');
    assert.dom(domSel('head link[rel=canonical]')).doesNotExist();
  });

  test('dns prefetch should be populated', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert
      .dom(domSel('head link[rel=dns-prefetch]'))
      .hasAttribute('href', 'https://ember-api-docs.global.ssl.fastly.net');
  });

  test('dns prefetch should be populated when root url visited', async function(assert) {
    await visit('/');
    assert
      .dom(domSel('head link[rel=dns-prefetch]'))
      .hasAttribute('href', 'https://ember-api-docs.global.ssl.fastly.net');
  });
});
