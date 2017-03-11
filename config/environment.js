/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    redisURL: process.env.REDIS_URL || 'redis://localhost:6379',
    modulePrefix: 'ember-api-docs',
    environment: environment,
    rootURL: '/',
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
  ENV.ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'BH4D9OD16A';
  ENV.ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || '760969ef081fcadc7e0e60faefdb0907';
  ENV.COUCH_URL = process.env.COUCH_URL || 'https://gaurav0.cloudant.com/docs';
  ENV.COUCH_USERNAME = process.env.COUCH_USERNAME || 'etyrisedingenstereachent';
  ENV.COUCH_PASSWORD = process.env.COUCH_PASSWORD || '827b95c5ecdc1beb5f96c2778f0068e35bc47b33';
  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
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
    ENV.COUCH_URL = process.env.COUCH_URL || 'https://gaurav0.cloudant.com/docs';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' http://localhost:5984 https://*.cloudant.com"
    };
  }

  return ENV;
};
