import { skip } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import { visit } from 'ember-native-dom-helpers';

const { $ } = Ember;

moduleForAcceptance('Acceptance | scroll reset on transition');

skip('reset scroll on transitions', async function(assert) {
  await visit('/');

  $('section.content').scrollTop(1000);
  assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT zero after scroll on fresh visit');

  await visit('/ember/1.0/classes/Ember.View');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is zero after transition to different route');
  $('section.content').scrollTop(1000);

  await visit('/ember/1.0/classes/Ember.Component');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/modules/ember');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/modules/runtime');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/namespaces/Ember.run');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/properties');

  assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/classes/Ember.RenderBuffer/methods');

  assert.notEqual($('section.content').scrollTop(), 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
  $('section.content').scrollTop(1000);

  await visit('ember/1.0/classes/Ember.Route/methods');

  assert.equal($('section.content').scrollTop(), 0, 'scroll position is resetted after visiting route with same tab but different model');
});
