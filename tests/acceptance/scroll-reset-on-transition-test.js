import $ from 'jquery';
import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { visit } from 'ember-native-dom-helpers';
import config from 'ember-api-docs/config/environment';

const { scrollContainerElement } = config.APP;

moduleForAcceptance('Acceptance | scroll reset on transition');

test('reset scroll on transitions', async function(assert) {
  await visit('/');

  $(scrollContainerElement).scrollTop(1000);
  assert.notEqual($(scrollContainerElement).scrollTop(), 0, 'scroll position is NOT zero after scroll on fresh visit');

  await visit('/ember/1.0/classes/Ember.View');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is zero after transition to different route');
  $(scrollContainerElement).scrollTop(1000);

  await visit('/ember/1.0/classes/Ember.Component');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/modules/ember');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/modules/runtime');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember.run');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/properties');


  assert.notEqual($(scrollContainerElement).scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/methods');

  assert.notEqual($(scrollContainerElement).scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
  $(scrollContainerElement).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.Route/methods');

  assert.equal($(scrollContainerElement).scrollTop(), 0, 'scroll position is resetted after visiting route with same tab but different model');
});
