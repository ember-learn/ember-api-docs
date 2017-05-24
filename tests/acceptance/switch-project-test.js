import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import {test} from 'qunit';

moduleForAcceptance('Acceptance | Switch Project');


test('Can switch projects back and forth', function(assert) {

  let ensureVersionsExist = () => {
    andThen(() => {
      selectSearch('.select-container', '2');
    });

    andThen(() => {
      assert.equal(find('.ember-power-select-options').length, 1);
      assert.ok(find('.ember-power-select-options')[0].children.length > 1);
    });
  };


  visit('/');

  click('.spec-ember-data');

  andThen(() => {
    ensureVersionsExist();
    assert.ok(findWithAssert('.spec-ember-data').hasClass('active'));
  });

  click('.spec-ember');

  andThen(() => {
    ensureVersionsExist();
    assert.ok(findWithAssert('.spec-ember').hasClass('active'));
  });

  click('.spec-ember-data');

  andThen(() => {
    ensureVersionsExist();
    assert.ok(findWithAssert('.spec-ember-data').hasClass('active'));
  });
});
