import Ember from 'ember';
import config from './config/environment';

const { on, inject } = Ember;

const Router = Ember.Router.extend({

  analytics: inject.service(),

  location: config.locationType,
  rootURL: config.routerRootURL,

  sendPageViewToGA: on('didTransition', function(page, title) {
    if (typeof FastBoot === 'undefined') {
      page = page ? page : this.get('url');
      title = title ? title : this.get('url');
      this.get('analytics').trackPage(page, title);
    }
  })
});

Router.map(function() {
  this.route('project', {path: '/:project'});
  this.route('project-version', {path: '/:project/:project_version'}, function() {
    // this.route('classes-redirect', {path: '/classes'});

    // project-version.classes-redirect => project-version.classes.index
    // project-version.class => project-version.classes.class
    this.route('classes', function() {
      this.route('class', { path: '/:class' }, itemRoutes);
    });
    // this.route('class', {path: '/classes/:class'}, itemRoutes);

    // Namespace routes
    // project-version.namespace => project-version.namespaces.namespace
    //    routes/project-version/namespace   =>  routes/project-version/namespaces/namespace
    this.route('namespaces', function() {
      this.route('namespace', {path: '/:namespace'}, itemRoutes)
    });
    // this.route('namespace', {path: '/namespaces/:namespace'}, itemRoutes);

    // Module routes
    // project-version.module => project-version.modules.module
    //    routes/project-version/module   =>  routes/project-version/modules/module
    //    routes/project-version/module/* =>  routes/project-version/modules/module/*
    this.route('modules', function() {
      this.route('module', {path: '/:module'}, itemRoutes);
    });
    // this.route('module', {path: '/modules/:module'}, itemRoutes);

    // Common sub-routes
    function itemRoutes() {
      this.route('methods', function() {
        this.route('method', {path: '/:method'});
      });
      this.route('properties', function() {
        this.route('property', {path: '/:property'});
      });
      this.route('events', function() {
        this.route('event', {path: '/:event'});
      });
    }
  });
  this.route('class', {path: '/classes/:class'});
  this.route('module', {path: '/modules/:module'});
  this.route('data-class', {path: '/data/classes/:class'});
  this.route('data-module', {path: '/data/modules/:module'});
});

export default Router;
