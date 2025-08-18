'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envIsProduction = process.env.EMBER_ENV === 'production';
const premberUrls = require('./prember-urls');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
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
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),

        // NOTE: put any code coverage plugins last, after the transform.
      ],
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
