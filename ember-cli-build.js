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
        'bower_components/bitters/core'
      ]
    },
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  });

  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import(app.bowerDirectory + '/jquery-scrollparent/jquery.scrollparent.js');
  }

  if (!process.env.EMBER_CLI_FASTBOOT && process.env.EMBER_ENV === 'test') {
    app.import(app.bowerDirectory + '/pouchdb/dist/pouchdb.memory.js');
  }

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
