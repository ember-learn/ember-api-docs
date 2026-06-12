'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envIsProduction = process.env.EMBER_ENV === 'production';
const premberUrls = require('./prember-urls');
const { setConfig } = require('@warp-drive/core/build-config');

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
    'asset-cache': {
      version: '4', //Might have to change this with the app build,
    },
    svgJar: {
      sourceDirs: ['public/assets/images'],
    },
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),

        // NOTE: put any code coverage plugins last, after the transform.
      ],
    },
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: true,
      },
    },
  });

  setConfig(app, __dirname, {
    // this should be the most recent <major>.<minor> version for
    // which all deprecations have been fully resolved
    // and should be updated when that changes
    compatWith: '4.12',
    deprecations: {
      // ... list individual deprecations that have been resolved here
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
