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
    if (pathName.indexOf('/methods/') === -1 &&
        pathName.indexOf('/properties/') === -1 &&
        pathName.indexOf('/events/') === -1) {
      var type = hash.slice(1, hash.indexOf('_'));
      var name = hash.slice(hash.indexOf('_') + 1, hash.length);
      var anchor = '?anchor=' + name + '&show=inherited,protected,private,deprecated';
      var newPath = pathName;
      if (type === 'method') {
        newPath = pathName + '/methods/' + name;
      } else if (type === 'property') {
        newPath = pathName + '/properties/' + name;
      } else if (type === 'event') {
        newPath = pathName + '/events/' + name;
      }
      window.location.href = window.location.origin + newPath + anchor;
    }
  }
</script>
`
    }
    return '';
  }
};
