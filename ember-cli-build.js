'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'svg', 'webmanifest'],
      generateAssetMap: true
    },
    sassOptions: {
      includePaths: ['app/styles', 'node_modules/normalize.css']
    },
    autoprefixer: {
      overrideBrowsersList: ['default']
    },
    'ember-composable-helpers': {
      only: ['join', 'map-by']
    },
    'asset-cache': {
      version: '4' //Might have to change this with the app build,
    },
    svgJar: {
      sourceDirs: ['public/assets/images']
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  return app.toTree();
};
