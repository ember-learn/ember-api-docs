import HistoryLocation from '@ember/routing/history-location';

/* When using this location type with ember-cli dev server, be sure to 
   set historySupportMiddleware: true in config/environment.js */

export default class extends HistoryLocation {
  formatURL() {
    let url = super.formatURL(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
}
