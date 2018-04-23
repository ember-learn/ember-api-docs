import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import $ from 'jquery';
import config from '../../config/environment';

let { API_HOST } = config;

module('Acceptance | head', function(hooks) {
  setupApplicationTest(hooks);

  test('no link rel=canonical for release url', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert.notOk($('head link[rel=canonical]').attr('href'));
  });

  test('shows link rel=canonical for version url', async function(assert) {
    await visit('/ember/2.16/classes/Application');
    assert.ok($('head link[rel=canonical]').attr('href'));
  });

  test('dns prefetch should be populated', async function(assert) {
    await visit('/ember/release/classes/Application');
    assert.equal($('head link[rel=dns-prefetch]').attr('href'), API_HOST);
  });

  test('no link rel=canonical when root url visited', async function(assert) {
    await visit('/');
    assert.equal($('head link[rel=canonical]').length, 0);
  });

  test('dns prefetch should be populated when root url visited', async function(assert) {
    await visit('/');
    assert.equal($('head link[rel=dns-prefetch]').attr('href'), API_HOST);
  });
});
