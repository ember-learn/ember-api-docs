/* eslint-env node */
'use strict';

module.exports = function(environment, appConfig) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties
  return {
    name: 'Ember API Docs',
    short_name: 'Ember API',
    description: 'Ember & Ember Data API Documentation',
    start_url: appConfig.routerRootURL,
    display: 'standalone',
    background_color: '#FDFDFD',
    theme_color: '#f67862',
    scope: appConfig.routerRootURL,
    lang: 'en-US',
    icons: [
      {
        src: '/assets/images/launch-icon-4x.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: '/assets/images/launch-icon-3x.png',
        sizes: '144x122',
        type: 'image/png'
      }, {
        src: '/assets/images/launch-icon-2x.png',
        sizes: '96x96',
        type: 'image/png'
      }, {
        src: '/assets/images/launch-icon-1-5x.png',
        sizes: '72x72',
        type: 'image/png'
      }, {
        src: '/assets/images/launch-icon-1x.png',
        sizes: '48x48',
        type: 'image/png'
      } , {
        src: '/assets/images/launch-icon-0-75x.png',
        sizes: '36x36',
        type: 'image/png'
      }
    ],
    apple: {
      'statusBarStyle': 'black-translucent'
    }
  };
}
