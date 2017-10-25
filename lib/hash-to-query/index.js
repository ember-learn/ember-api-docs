/* eslint-env node */
'use strict';

module.exports = {
  name: 'hash-to-query',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor (type, config) {
    if (type === 'body') {
      return `
<script type='text/javascript'>
  var hash = window.location.hash;
  if (hash && hash.length > 1) {
    var pathName = window.location.pathname;
    var type = hash.slice(1, hash.indexOf('_'));
    var name = hash.slice(hash.indexOf('_') + 1, hash.length);
    var anchor = '?anchor=' +
                 name +
                 '&show=inherited,protected,private,deprecated' +
                 '&type=' +
                 type;
    window.location.hash = '';
    window.location.search = anchor;
  }
</script>
`
    }
    return '';
  }
};
