export function initialize() {

  // Source: https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
}

export default {
  name: 'add-string-includes-polyfill',
  initialize
};
