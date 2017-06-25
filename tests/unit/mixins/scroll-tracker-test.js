import Ember from 'ember';
import ScrollTrackerMixin from 'ember-api-docs/mixins/scroll-tracker';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll tracker');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollTrackerObject = Ember.Object.extend(ScrollTrackerMixin);
  let subject = ScrollTrackerObject.create();
  assert.ok(subject);
});
