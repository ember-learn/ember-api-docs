/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const mergeTrees  = require('broccoli-merge-trees');
const fetch = require('node-fetch')
const _ = require('lodash');

module.exports = function(defaults) {
  let prepend = '';
  if ('FASTLY_CDN_URL' in process.env) {
    prepend = `https://${process.env.FASTLY_CDN_URL}/`;
  }

  let app = new EmberApp(defaults, {
    prember: {
      urls() {
        return fetch('https://ember-api-docs.global.ssl.fastly.net/rev-index/ember-2.18.0.json')
          .then(res => res.json())
          .then(json => {
            return _.chain(json)
              .get('data.relationships.classes.data')
              .map('id')
              .map(id => {
                const parts = id.split('-');

                return `${parts[0]}/${parts[1]}/classes/${parts[2]}`;
              })
              .value();
          });
      }
    },
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

  let mappingsTree = new Funnel('node_modules/ember-rfc176-data/', {
    srcDir: '/',
    include: ['mappings.json'],
    destDir: '/assets/'
  });
  return mergeTrees([app.toTree(), mappingsTree]);
};
