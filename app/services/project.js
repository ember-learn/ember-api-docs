import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Service.extend({
  version: '0.0.0',

  standardisedVersion: Ember.computed('version', function () {
    const version = String(get(this, 'version'));
    const versionFragments = version.split('.');
    return `v${versionFragments[0]}.${versionFragments[1]}.0`;
  }),

  setVersion(version) {
    this.set('version', version);
  }
});
