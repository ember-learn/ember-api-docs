/* eslint-env node */
'use strict';

module.exports = {
  name: 'hash-to-query',

  isDevelopingAddon: function() {
    return true;
  },

  included(app) {
    this._super.included.apply(this, arguments);
    this.import('vendor/hash-to-query.js');
  }
};
