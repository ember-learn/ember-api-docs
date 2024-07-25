'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envIsProduction = process.env.EMBER_ENV === 'production';
const premberUrls = require('./prember-urls');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls: premberUrls(),
    },
    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'webmanifest'],
      generateAssetMap: true,
    },
    autoprefixer: {
      enabled: true,
      cascade: true,
      sourcemap: !envIsProduction,
      overrideBrowsersList: ['default'],
    },
    'ember-composable-helpers': {
      only: ['join', 'map-by'],
    },
    'asset-cache': {
      version: '4', //Might have to change this with the app build,
    },
    svgJar: {
      sourceDirs: ['public/assets/images'],
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    'ember-fetch': {
      preferNative: true,
    },
  });

  const { Webpack } = require('@embroider/webpack');
  const appTree = require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
  });

  return require('prember').prerender(app, appTree);
};
