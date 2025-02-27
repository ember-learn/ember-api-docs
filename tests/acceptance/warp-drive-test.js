/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | WarpDrive', function (hooks) {
  setupApplicationTest(hooks);

  test('can visit a @warp-drive package', async function (assert) {
    await visit(
      '/ember-data/release/modules/@warp-drive%2Fbuild-config%2Fdeprecations'
    );

    assert
      .dom('.module-name')
      .includesText('Package @warp-drive/build-config/deprecations');
  });
});
