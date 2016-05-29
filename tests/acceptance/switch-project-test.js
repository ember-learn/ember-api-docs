import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';

moduleForAcceptance('Switch Project', {
  beforeEach() {
    return visit('/');
  }

});

test('Can switch projects back and forth', function(assert) {
  let versionsBox;

  click('.spec-ember-data');

  andThen(() => {
    versionsBox = findWithAssert('.spec-versions-box');
    assert.equal(versionsBox.length, 1);
    assert.ok(versionsBox[0].options.length > 0);
    assert.ok(findWithAssert('.spec-ember-data').hasClass('active'));
  });

  click('.spec-ember');

  andThen(() => {
    versionsBox = findWithAssert('.spec-versions-box');
    assert.equal(versionsBox.length, 1);
    assert.ok(versionsBox[0].options.length > 0);
    assert.ok(findWithAssert('.spec-ember').hasClass('active'));
  });

  click('.spec-ember-data');

  andThen(() => {
    versionsBox = findWithAssert('.spec-versions-box');
    assert.equal(versionsBox.length, 1);
    assert.ok(versionsBox[0].options.length > 0);
    assert.ok(findWithAssert('.spec-ember-data').hasClass('active'));
  });
});
