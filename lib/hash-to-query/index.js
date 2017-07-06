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
  let hash = window.location.hash;
  if (hash && hash.length > 1) {
    let pathName = window.location.pathname;
    console.log(pathName);
    if (!pathName.includes('/methods/') &&
        !pathName.includes('/properties/') &&
        !pathName.includes('/events/')) {
      let type = hash.slice(1, hash.indexOf('_'));
      let name = hash.slice(hash.indexOf('_') + 1, hash.length);
      let anchor = '?anchor=' + name + '&show=inherited,protected,private,deprecated';
      let newPath = pathName;
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
