import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | convert legacy url to current', function (hooks) {
  setupApplicationTest(hooks);

  test('should convert url for legacy Ember class', async function (assert) {
    await visit('/classes/Ember.Application.html');
    assert.equal(currentURL(), '/ember/release/classes/Application');
  });

  test('should convert url for legacy Ember class to function', async function (assert) {
    await visit('/classes/Ember.computed.html');
    assert.equal(
      currentURL(),
      '/ember/release/functions/@ember%2Fobject/computed'
    );
  });

  test('should convert url for legacy ember data class', async function (assert) {
    await visit('/data/classes/DS.Adapter.html');
    assert.equal(currentURL(), '/ember-data/release/classes/Adapter');
  });

  test('should convert url for legacy ember module', async function (assert) {
    await visit('/modules/ember-application.html');
    assert.equal(currentURL(), '/ember/release/modules/@ember%2Fapplication');
  });

  test('should convert url for legacy ember data module to overview', async function (assert) {
    await visit('/data/modules/ember-data.html');
    assert.equal(
      currentURL(),
      '/ember-data/release/modules/ember-data-overview'
    );
  });

  test('should convert unknown legacy modules url to landing page', async function (assert) {
    await visit('/modules/ember-metal'); //no .html
    assert.equal(currentURL(), '/ember/release');
  });

  test('should display 404 when navigating to unknown legacy data url', async function (assert) {
    await visit('/data/modules/ember-random.html');
    assert.equal(currentURL(), '/data/modules/ember-random.html');
    assert
      .dom('.whoops__title')
      .hasText(`Ack! 404 friend, you're in the wrong place`);
  });

  test('should convert unknown legacy classes url to landing page', async function (assert) {
    await visit('classes/Ember.View.html');
    assert.equal(currentURL(), '/ember/release');
  });
});
