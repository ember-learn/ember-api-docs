import { visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

let snapshots = [
  ['/', 'Landing Page'],
  ['/ember-data/', 'Ember Data Landing Page'],
  ['/ember/release/modules/@ember%2Fcomponent', 'Package Page'],
  ['/ember/release/classes/Component', 'Class Index'],
  ['/ember/release/classes/Component/methods', 'Class Methods'],
  ['/ember/release/classes/Component/properties', 'Class Properties'],
  ['/ember/release/classes/Component/events', 'Class Events'],
  ['/ember/release/functions/@ember%2Fcomponent/capabilities', 'Function Page'],
  ['/ember/release/namespaces/Instrumentation', 'Namespace Page'],
  ['/ember/release/namespaces/FEATURES/methods', 'Namespace methods page'],
];

module('Acceptance | percy', function (hooks) {
  setupApplicationTest(hooks);

  test('Percy snapshots', async function (assert) {
    for (let [page, title] of snapshots) {
      await visit(page);
      await percySnapshot(title);
    }

    assert.ok(true);
  });
});
