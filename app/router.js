import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('project', {path: '/:project'});
  this.route('project-version', {path: '/:project/:project_version'}, function() {
    this.route('classes-redirect', {path: '/classes'});
    this.route('class', {path: '/classes/:class'}, itemRoutes);
    this.route('module', {path: '/modules/:module'}, itemRoutes);
    this.route('namespace', {path: '/namespaces/:namespace'}, itemRoutes);

    function itemRoutes() {
      this.route('methods', {resetNamespace: true}, function() {
        this.route('method', {path: '/:method'});
      });
      this.route('properties', {resetNamespace: true}, function() {
        this.route('property', {path: '/:property'});
      });
      this.route('events', {resetNamespace: true}, function() {
        this.route('event', {path: '/:event'});
      });
    }
  });
});

export default Router;
