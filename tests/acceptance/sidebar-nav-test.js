import { test } from 'qunit';

import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sidebar navigation');

test('can navigate to namespace from sidebar', function(assert) {
  visit('/ember/1.0.0');
  click('.toc-level-1.namespaces a:contains(Ember.String)');

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/namespaces/Ember.String', 'navigated to namespace');
  });
});

test('can navigate to module from sidebar', function(assert) {
  visit('/ember/1.0.0');
  click('.toc-level-1.modules a:contains(application)');

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/modules/application', 'navigated to module');
  });
});

test('can navigate to class from sidebar', function(assert) {
  visit('/ember/1.0.0');
  click('.toc-level-1.classes a:contains(Ember.Component)');

  andThen(() => {
    assert.equal(currentURL(), '/ember/1.0.0/classes/Ember.Component', 'navigated to class');
  });
});
