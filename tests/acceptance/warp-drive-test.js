import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | WarpDrive', function (hooks) {
  setupApplicationTest(hooks);

  test('can visit a @warp-drive package', async function (assert) {
    await visit('/ember-data/release/modules/@warp-drive%2Fbuild-config');

    assert.dom('.module-name').includesText('Package @warp-drive/build-config');
  });

  test('EmberData pages point to the WarpDrive API docs', async function (assert) {
    await visit('/ember-data/release/classes/Store');

    assert
      .dom('[data-test-warp-drive-notice] a')
      .hasAttribute('href', 'https://warp-drive.io/api/');
  });

  test('Ember pages have no WarpDrive notice', async function (assert) {
    await visit('/ember/release/classes/Component');

    assert.dom('[data-test-warp-drive-notice]').doesNotExist();
  });
});
