import { computed } from '@ember/object';
import Service from '@ember/service';
import get from 'ember-metal/get';

export default Service.extend({
  version: '0.0.0',

  standardisedVersion: computed('version', function () {
    const version = String(get(this, 'version'));
    const versionFragments = version.split('.');
    return `v${versionFragments[0]}.${versionFragments[1]}.0`;
  }),

  setVersion(version) {
    this.set('version', version);
  },

  setUrlVersion(version) {
    this.set('urlVersion', version);
  },

  getUrlVersion() {
    return this.get('urlVersion');
  }
});
