/*eslint-env node:true*/
'use strict';

module.exports = function(environment /*, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: 'Ember API Docs',
    short_name: 'Ember API',
    description: 'Ember & Ember Data API Documentation',
    start_url: environment === 'production' ? '/api-new/' : '/',
    display: 'standalone',
    background_color: '#FDFDFD',
    theme_color: '#f67862',
    prepend: environment === 'production' && 'FASTLY_CDN_URL' in process.env ? FASTLY_CDN_URL.env : '',
    scope: environment === 'production' ? '/api-new/' : '/',
    icons: [
      {
        src: '/assets/images/launcher-icon-4x.png',
        sizes: '192x163',
        type: 'image/png'
      }, {
        src: '/assets/images/launcher-icon-3x.png',
        sizes: '144x122',
        type: 'image/png'
      }, {
        src: '/assets/images/launcher-icon-2x.png',
        sizes: '96x81',
        type: 'image/png'
      }, {
        src: '/assets/images/launcher-icon-1-5x.png',
        sizes: '72x61',
        type: 'image/png'
      }, {
        src: '/assets/images/launcher-icon-1x.png',
        sizes: '48x41',
        type: 'image/png'
      } , {
        src: '/assets/images/launcher-icon-0-75x.png',
        sizes: '36x30',
        type: 'image/png'
      }
    ],
    apple: {
      'statusBarStyle': 'black-translucent'
    }
  };
}
