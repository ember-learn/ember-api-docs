import EmberRouter from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import config from 'ember-api-docs/config/environment';
import { inject as service } from '@ember/service';

class AppRouter extends EmberRouter {
  location = config.locationType;
  rootURL = config.routerRootURL;

  @service metrics;
  @service fastboot;

  constructor() {
    super(...arguments);

    if (!this.fastboot.isFastBoot) {
      this.on('routeDidChange', this, this._trackPage);
    }
  }

  _trackPage() {
    scheduleOnce('afterRender', this, this.__trackPage);
  }

  __trackPage() {
    // this is constant for this app and is only used to identify page views in the GA dashboard
    const hostname = config.APP.domain.replace(/(http|https)?:?\/\//g, '');

    const page = this.url;
    const title =
      this.currentRouteName === undefined ? 'unknown' : this.currentRouteName;
    this.metrics.trackPage({ page, title, hostname });
  }
}

AppRouter.map(function () {
  this.route('ember-cli');
  this.route('project', { path: '/:project' });

  this.route(
    'project-version',
    { path: '/:project/:project_version' },
    function () {
      // this.route('classes-redirect', {path: '/classes'});

      // project-version.classes-redirect => project-version.classes.index
      // project-version.class => project-version.classes.class
      this.route('classes', function () {
        this.route('class', { path: '/:class' });
      });
      // this.route('class', {path: '/classes/:class'}, itemRoutes);

      this.route('functions', function () {
        this.route('function', { path: '/:module/:fn' });
      });

      // Namespace routes
      // project-version.namespace => project-version.namespaces.namespace
      //    routes/project-version/namespace   =>  routes/project-version/namespaces/namespace
      this.route('namespaces', function () {
        this.route('namespace', { path: '/:namespace' });
      });
      // this.route('namespace', {path: '/namespaces/:namespace'}, itemRoutes);

      // Module routes
      // project-version.module => project-version.modules.module
      //    routes/project-version/module   =>  routes/project-version/modules/module
      //    routes/project-version/module/* =>  routes/project-version/modules/module/*
      this.route('modules', function () {
        this.route('module', { path: '/:module' });
      });
      // this.route('module', {path: '/modules/:module'}, itemRoutes);
    }
  );
  this.route('class', { path: '/classes/:class' });
  this.route('module', { path: '/modules/:module' });
  this.route('data-class', { path: '/data/classes/:class' });
  this.route('data-module', { path: '/data/modules/:module' });
  this.route('not-found', { path: '/*' });
});

/*
404
ember-cli
project

OTHER STATES
private, deprecated, inherited, protected
inherited is not reflected in URL state but it's checked by default

MAYBE REDIRECTS

/data/modules/:module
/data/classes/:class
/modules/:module
/classes/:class
*/

export default AppRouter;
