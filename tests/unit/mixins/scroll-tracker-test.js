import EmberObject from '@ember/object';
import ScrollTrackerMixin from 'ember-api-docs/mixins/scroll-tracker';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll tracker', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let ScrollTrackerObject = EmberObject.extend(ScrollTrackerMixin);
    let subject = ScrollTrackerObject.create();
    assert.ok(subject);
  });
});