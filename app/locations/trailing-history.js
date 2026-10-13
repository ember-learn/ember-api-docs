import HistoryLocation from '@ember/routing/history-location';

/* When using this location type with ember-cli dev server, be sure to
   set historySupportMiddleware: true in config/environment.js */

export default class TrailingHistoryLocation extends HistoryLocation {
  formatURL() {
    return formatURL(super.formatURL(...arguments));
  }
}

export function formatURL(url) {
  let parsed = new URL(url, 'http://example.com');
  if (!parsed.pathname.endsWith('/')) {
    parsed.pathname += '/';
  }
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
