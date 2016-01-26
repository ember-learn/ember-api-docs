/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-api-docs',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        'ds-references': true
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' http://localhost:5984 https://fivetanley.cloudant.com"
    };
    ENV.COUCH_URL = process.env.COUCH_URL || 'https://fivetanley.cloudant.com/docs';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.testing = true;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.COUCH_URL = 'http://localhost:5984/docs'
  }

  if (environment === 'production') {

  }

  return ENV;
};
