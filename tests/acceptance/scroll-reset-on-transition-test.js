import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import config from 'ember-api-docs/config/environment';

const { scrollContainerSelector } = config.APP;

module('Acceptance | scroll reset on transition', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.scrollSelector = document.querySelector(scrollContainerSelector);
  });

  test('reset scroll on transitions', async function(assert) {
    await visit('/ember/2.15');
    this.scrollSelector.scrollTop = 1000;
    assert.notEqual(this.scrollSelector.scrollY, 0, 'scroll position is NOT zero after scroll on fresh visit');

    await visit('/ember/1.0/classes/Ember.View');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is zero after transition to different route');
    this.scrollSelector.scrollTop = 1000;

    await visit('/ember/1.0/classes/Ember.Component');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project.version.class.index to project-version.class.index (same route different model)');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/modules/ember');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project-version.class.index to project-version.module.index');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/modules/runtime');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project-version.module.index to project-version.module.index (same route different model)');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/namespaces/Ember');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project-version.module.index to project-version.namespace.index');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/namespaces/Ember.run');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.namespace.index (same route different model)');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/classes/Ember.RenderBuffer/');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after transition: project-version.namespace.index to project-version.class.index');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/classes/Ember.RenderBuffer/properties');


    assert.notEqual(this.scrollSelector.scrollTop, 0, 'scroll position is NOT resetted after changing tab in project-version.class (properties)');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/classes/Ember.RenderBuffer/methods');

    assert.notEqual(this.scrollSelector.scrollTop, 0, 'scroll position is NOT resetted after changing tab in project-version.class (methods)');
    this.scrollSelector.scrollTop = 1000;

    await visit('ember/1.0/classes/Ember.Route/methods');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is resetted after visiting route with same tab but different model');

    await visit('/ember/2.16');
    this.scrollSelector.scrollTop = 1000;
    assert.notEqual(this.scrollSelector.scrollTop, 0, 'scroll position is NOT zero after scroll on fresh visit');

    await visit('/ember/2.15/classes/Ember.Error');

    assert.equal(this.scrollSelector.scrollTop, 0, 'scroll position is zero after transition to different route');
  });
});
