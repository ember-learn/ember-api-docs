/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'Y1OMR4C7MF';
  let ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || 'c35425b69b31be1bb4786f0a72146306';

  let ENV = {
    modulePrefix: 'ember-api-docs',
    environment,
    rootURL: '/',
    routerRootURL: '/',
    locationType: 'auto',
    API_HOST: process.env.API_HOST || 'https://api-store.emberjs.com',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        //'ember-glimmer': true
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      scrollContainerSelector: 'body, html',
      domain: 'http://localhost:4200'
    },

    fastboot: {
      hostWhitelist: [
        /^[\w-]+\.herokuapp\.com$/,
        /^localhost:\d+$/,
        /^127\.0\.0\.1:\d+$/,
        /^[\w-]+\.fastly\.net$/,
        /^[\w-]+\.emberjs\.com$/
      ]
    },
    algolia: {
      algoliaId: ALGOLIA_APP_ID,
      algoliaKey: ALGOLIA_API_KEY
    },
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['production'],
        config: {
          id: 'UA-27675533-1'
        }
      }
    ]
  };


  ENV.contentSecurityPolicy = {
    'default-src': "'self' *.emberjs.com",
    'connect-src': "'self' *.algolia.net *.algolianet.com *.emberjs.com",
    'script-src':
      "'self' unsafe-inline use.typekit.net 'sha256-LEXBvGgYbhXJLZxA/dKnIx07iQsbEcS9SDWq01pWVAk=' *.emberjs.com https://www.google-analytics.com",
    'font-src': "'self' data://* https://fonts.gstatic.com  *.emberjs.com",
    'img-src': "'self' data://*  *.emberjs.com https://www.google-analytics.com",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com  *.emberjs.com"
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

    ENV.contentSecurityPolicy['connect-src'] += " localhost:5050"
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.testing = true;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.scrollContainerSelector = '#ember-testing-container';

    ENV.percy = {
      breakpointsConfig: {
        mobile: 375,
        tablet: 768,
        desktop: 1280
      },
      defaultBreakpoints: ['mobile', 'desktop']
    };

    ENV.APP.autoboot = false;

    ENV['ember-tether'] = {
      bodyElementId: 'ember-testing'
    };
  }

  if (environment === 'production') {
    ENV.APP.domain = process.env.APP_DOMAIN_URL ? process.env.APP_DOMAIN_URL : 'https://api.emberjs.com';
  }

  return ENV;
};
