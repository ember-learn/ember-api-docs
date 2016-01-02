import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';

moduleForAcceptance('Application Layout', {
  beforeEach() {
    return visit('/');
  }

});

test('lists the project versions in a select box', function(assert) {
  const versionsBox = findWithAssert('.spec-versions-box');
  assert.equal(versionsBox.length);
});
