import $ from 'jquery';
import { skip } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { visit } from 'ember-native-dom-helpers';
import config from 'ember-api-docs/config/environment';

const { scrollContainerSelector } = config.APP;

moduleForAcceptance('Acceptance | scroll reset on transition');

skip('reset scroll on transitions', async function(assert) {
  await visit('/');

  $(scrollContainerSelector).scrollTop(1000);
  assert.notEqual($(scrollContainerSelector).scrollTop(), 0, 'scroll position is NOT zero after scroll on fresh visit');

  await visit('/ember/1.0/classes/Ember.View');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is zero after transition to different route');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('/ember/1.0/classes/Ember.Component');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/modules/ember');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/modules/runtime');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember.run');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/properties');


  assert.notEqual($(scrollContainerSelector).scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/methods');

  assert.notEqual($(scrollContainerSelector).scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
  $(scrollContainerSelector).scrollTop(1000);

  await visit('ember/1.0/classes/Ember.Route/methods');

  assert.equal($(scrollContainerSelector).scrollTop(), 0, 'scroll position is resetted after visiting route with same tab but different model');
});
