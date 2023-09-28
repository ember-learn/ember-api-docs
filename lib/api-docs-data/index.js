'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new Funnel('ember-api-docs-data', {
      include: ['**/json-docs/**', '**/rev-index/**'],
    });
  },
};
