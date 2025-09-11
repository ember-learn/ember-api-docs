import EmberRouter from '@ember/routing/router';
import config from 'ember-api-docs/config/environment';

class AppRouter extends EmberRouter {
  location = config.locationType;
  rootURL = config.routerRootURL;
}

AppRouter.map(function () {
  this.route('ember-cli');
  this.route('project', { path: '/:project' });

  this.route(
    'project-version',
    { path: '/:project/:project_version' },
    function () {
      this.route('classes', function () {
        this.route('class', { path: '/:class' });
      });

      this.route('functions', function () {
        this.route('function', { path: '/:module/:fn' });
      });

      // Namespace routes
      this.route('namespaces', function () {
        this.route('namespace', { path: '/:namespace' });
      });

      // Module routes
      this.route('modules', function () {
        this.route('module', { path: '/:module' });
      });
    },
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

See _redirects for netlify redirects
*/

export default AppRouter;
