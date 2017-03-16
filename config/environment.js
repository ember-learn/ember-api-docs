/* eslint-env node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-api-docs',
    environment: environment,
    rootURL: '/',
    routerRootURL: '/',
    locationType: 'auto',
    IS_FASTBOOT: !!process.env.EMBER_CLI_FASTBOOT,
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        //'ember-glimmer': true
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: [/^[\w\-]+\.herokuapp\.com$/, /^localhost:\d+$/]
    }
  };

  if (environment === 'development') {
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' http://localhost:5984 https://*.cloudant.com",
      "script-src": "'self' unsafe-inline use.typekit.net",
      "font-src": "'self' data://* use.typekit.net",
      "img-src": "'self' p.typekit.net",
      "style-src": "'self' 'unsafe-inline' https://use.typekit.net"
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.testing = true;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' http://localhost:5984 https://*.cloudant.com"
    };

    /**
     * Ideally we want this to be only for fast boot. But we have to wait for
     * https://github.com/ember-fastboot/ember-cli-fastboot/issues/254 to be
     * solved for that
     */
    ENV.routerRootURL = '/api-new/';

  }

  return ENV;
};
