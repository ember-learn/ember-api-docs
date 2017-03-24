/* eslint-env node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-api-docs',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    API_HOST: 'https://s3.amazonaws.com/sk-ed',
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
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-a11y-testing'] = {
      componentOptions: {
        turnAuditOff: process.env.test_a11y !== 'yes'
      }
    };
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

  ENV.contentSecurityPolicy = {
    "default-src": "'self'",
    "connect-src": "'self' https://s3.amazonaws.com",
    "script-src": "'self' unsafe-inline use.typekit.net 'sha256-36n/xkZHEzq3lo4O+0jXMYbl+dWu3C8orOFHtcAH6HU='",
    "font-src": "'self' data://* https://fonts.gstatic.com",
    "img-src": "'self' data:",
    "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com"
  };

  if (environment === 'production') {
  }

  if ('FASTLY_CDN_URL' in process.env) {
    ENV.CDN_URL = process.env.FASTLY_CDN_URL;
  }

  return ENV;
};
