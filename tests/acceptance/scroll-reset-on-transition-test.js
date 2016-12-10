import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import Ember from 'ember';

const { $ } = Ember;

moduleForAcceptance('Acceptance | scroll reset on transition');

test('reset scroll on transitions', function(assert) {
  visit('/');

  andThen(() => {
    $('section.content').scrollTop(1000);
    assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT zero after scroll on fresh visit');
  });

  visit('/ember/1.0.0/classes/Ember.View');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is zero after transition to different route');
    $('section.content').scrollTop(1000);
  });

  visit('/ember/1.0.0/classes/Ember.Component');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/modules/ember');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/modules/runtime');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/namespaces/Ember');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/namespaces/Ember.run');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/properties');

  andThen(() => {
    assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.RenderBuffer/methods');

  andThen(() => {
    assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
    $('section.content').scrollTop(1000);
  });

  visit('ember/1.0.0/classes/Ember.Route/methods');

  andThen(() => {
    assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after visiting route with same tab but different model');
  });

});
