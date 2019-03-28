import Router from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import config from './config/environment';
import { inject as service } from '@ember/service';

const AppRouter = Router.extend({
  location: config.locationType,
  rootURL: config.routerRootURL,

  metrics: service(),
  fastboot: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (this.get('fastboot.isFastBoot')) {
      return;
    }

    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      // this is constant for this app and is only used to identify page views in the GA dashboard
      const hostname = 'api.emberjs.com';

      this.get('metrics').trackPage({ page, title, hostname });
    });
  }
});

AppRouter.map(function() {
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

    this.route('functions', function() {
      this.route('function', {path: '/:module/:fn'});
    });

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

export default AppRouter;
