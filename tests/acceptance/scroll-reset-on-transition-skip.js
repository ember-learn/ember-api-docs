import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import Ember from 'ember';

const { $ } = Ember;

moduleForAcceptance('Acceptance | scroll reset on transition');

test('reset scroll on transitions', function(assert) {
  visit('/');

  andThen(() => {
    $('main > article').scrollTop(1000);
    assert.notEqual($('main > article').scrollTop(), 0, 'scroll position is NOT zero after scroll on fresh visit');
  });

  visit('/ember/1.0.0/classes/Container');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is zero after transition to different route');
    $('main > article').scrollTop(1000);
  });

  visit('/ember/1.0.0/classes/Ember.Component');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/modules/ember');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/modules/application');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/namespaces/Ember');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/namespaces/Ember.run');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/properties');

  andThen(() => {
    assert.notEqual($('main > article').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/methods');

  andThen(() => {
    assert.notEqual($('main > article').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
    $('main > article').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.Route/methods');

  andThen(() => {
    assert.equal($('main > article').scrollTop(), 0, 'scroll position is resetted after visiting route with same tab but different model');
  });

});
