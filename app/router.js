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
  this.route('404');
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

    // Package routes
    // project-version.package => project-version.packages.package
    //    routes/project-version/package   =>  routes/project-version/packages/package
    //    routes/project-version/package/* =>  routes/project-version/packages/package/*
    this.route('packages', function() {
      this.route('package', {path: '/:package'}, itemRoutes);
    });

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
  this.route('package', {path: '/packages/:package'});
  this.route('data-class', {path: '/data/classes/:class'});
  this.route('data-package', {path: '/data/packages/:package'});
});

export default Router;
