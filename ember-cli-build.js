/* eslint-env node: true */
let EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let prepend = '';
  if ('FASTLY_CDN_URL' in process.env) {
    prepend = `https://${process.env.FASTLY_CDN_URL}/`;
  }

  let app = new EmberApp(defaults, {

    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'svg'],
      prepend: prepend,
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
    }
  });

  app.options['esw-cache-first'] = {
    patterns: [
      `${app.env.API_HOST}/json-docs-1/(.+)`,
      `${app.env.API_HOST}/rev-index/(.+)`
    ]
  };


  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import(app.bowerDirectory + '/jquery-scrollparent/jquery.scrollparent.js');
  }

  return app.toTree();
};
