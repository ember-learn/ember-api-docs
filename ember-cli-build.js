/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const mergeTrees  = require('broccoli-merge-trees');

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
      sourceDirs: ['public/assets/images']
    }
  });

  let mappingsTree = new Funnel('node_modules', {
    srcDir: 'ember-rfc176-data',
    include: ['*.json'],
    destDir: '/assets/rfc176'
  });

  return mergeTrees([app.toTree(), mappingsTree]);
};
