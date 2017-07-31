/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let prepend = '';
  if ('FASTLY_CDN_URL' in process.env) {
    prepend = `https://${process.env.FASTLY_CDN_URL}/`;
  }

  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'svg', 'webmanifest'],
      prepend,
      generateAssetMap: true
    },
    sassOptions: {
      includePaths: [
        'app/styles',
        'bower_components/neat/app/assets/stylesheets',
        'bower_components/bitters/core'
      ]
    },
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    'ember-composable-helpers': {
      only: ['join', 'map-by']
    },
    'asset-cache': {
      version: '4', //Might have to change this with the app build,
      prepend
    },
    svgJar: {
      sourceDirs: ['public/assets/images'],
    },
  });

  var docsSlug = process.env.DOCS_SLUG ? process.env.DOCS_SLUG : '/api-new/';

  //TODO move the proxying main site to a variable for testing & dev
  app.options['ember-service-worker'] = {
    rootUrl: app.env.environment === 'production' ? 'https://emberjs.com' + docsSlug : '/'
  };


  app.options['esw-cache-first'] = {
    patterns: [
      `${app.env.API_HOST}/json-docs/(.+)`,
      `${app.env.API_HOST}/rev-index/(.+)`
    ]
  };

  return app.toTree();
};
