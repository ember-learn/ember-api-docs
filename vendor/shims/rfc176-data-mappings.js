(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['mappings'],
      __esModule: true
    };
  }

  define('rfc176-data-mappings', [], vendorModule);
})();
