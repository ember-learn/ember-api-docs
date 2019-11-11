'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const mergeTrees  = require('broccoli-merge-trees');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'svg', 'webmanifest'],
      generateAssetMap: true
    },
    sassOptions: {
      includePaths: [
        'app/styles',
        'node_modules/bourbon-neat/app/assets/stylesheets',
        'node_modules/normalize.css'
      ]
    },
    autoprefixer: {
      overrideBrowsersList: ['default']
    },
    'ember-composable-helpers': {
      only: ['join', 'map-by']
    },
    'asset-cache': {
      version: '4', //Might have to change this with the app build,
    },
    svgJar: {
      sourceDirs: ['public/assets/images']
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
  });

  let mappingsTree = new Funnel('node_modules/ember-rfc176-data/', {
    srcDir: '/',
    include: ['mappings.json'],
    destDir: '/assets/'
  });
  return mergeTrees([app.toTree(), mappingsTree]);
};
