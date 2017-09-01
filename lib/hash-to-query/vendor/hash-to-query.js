(() => {
  /* globals define */
  function hashToQuery(hash, pathName) {
    if (hash && hash.length > 1) {
      if (pathName.indexOf('/methods/') === -1 &&
          pathName.indexOf('/properties/') === -1 &&
          pathName.indexOf('/events/') === -1) {
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
        return newPath + anchor;
      }
    }
  }
  if (typeof FastBoot === 'undefined') {
    let redirectToUrl = hashToQuery(window.location.hash, window.location.pathname);
    if (redirectToUrl) {
      window.location.href = window.location.origin + redirectToUrl;
    }
  }
  define('hash-to-query', function () {
    'use strict';
    return {
      default: hashToQuery
    }
  });
})()
