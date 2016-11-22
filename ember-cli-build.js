/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var prepend = '';
  if ('FASTLY_CDN_URL' in process.env) {
    prepend = `https://${process.env.FASTLY_CDN_URL}/`;
  }

  var app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'jpg', 'png', 'gif', 'map', 'svg'],
      prepend: prepend,
      generateAssetMap: true
    },
    sassOptions: {
      includePaths: [
        'app/styles',
        'bower_components/neat/app/assets/stylesheets',
        'bower_components/bitters/app/assets/stylesheets'
      ]
    }
  });

  app.import(app.bowerDirectory + '/highlightjs/styles/github.css');
  app.import(app.bowerDirectory + '/highlightjs-line-numbers.js/src/highlightjs-line-numbers.js');

  if (!process.env.EMBER_CLI_FASTBOOT && process.env.EMBER_ENV === 'test') {
    app.import(app.bowerDirectory + '/pouchdb/dist/pouchdb.memory.js');
  }

  return app.toTree();
};
