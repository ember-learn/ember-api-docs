/*eslint-env node:true*/
'use strict';

module.exports = function(environment /*, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: 'Ember API Docs',
    short_name: 'ember-api-docs',
    description: 'Ember & Ember Data API Documentation',
    start_url: environment === 'production' ? '/api-new/' : '/',
    display: 'standalone',
    background_color: '#FDFDFD',
    theme_color: '#f67862',
    scope: environment === 'production' ? '/api-new/' : '/',
    icons: [
      {
        src: '/assets/images/ember-logo.png',
        sizes: '1200x1016',
        type: 'image/png'
      }
    ],
    apple: {
      'statusBarStyle': 'black-translucent'
    }
  };
}
