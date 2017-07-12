const _parseHash = function(hash) {
  let name = '';
  let urlType = '';
  let hashParts = hash.split('_');
  if (hashParts && hashParts.length === 2) {
    name = hashParts[1];
    let type = hashParts[0];
    // take off the "#"
    let finalType = type.slice(1, type.length);
    switch (finalType) {
      case 'method':
        urlType = 'methods';
        break;
      case 'property':
        urlType = 'properties';
        break;
      case 'event':
        urlType = 'events';
        break;
      default:
        urlType = '';
    }
    return {
      urlType,
      name
    };
  }
  return null;

}

function hashToUrl(window) {
  if (window && window.location && window.location.hash) {
    let hashInfo = _parseHash(window.location.hash)
    if (hashInfo) {
      return `${window.location.pathname}/${hashInfo.urlType}/${hashInfo.name}?anchor=${hashInfo.name}`
    }
  }

  return null;
}

function hasRedirectableHash(window) {
  let canRedirect = false;
  if (window && window.location && window.location.hash) {
    let hashParts = window.location.hash.split('_');
    if (hashParts && hashParts.length === 2) {
      canRedirect = true;
    }
  }
  return canRedirect;
}

export {
  hashToUrl,
  hasRedirectableHash
}

