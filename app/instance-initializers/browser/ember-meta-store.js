import Ember from 'ember';

const {isPresent} = Ember;

export function initialize(appInstance) {
  const metaStore = appInstance.lookup('service:meta-store');
  const fastBootService = appInstance.lookup('service:fastboot');

  const shoebox = fastBootService.get('shoebox');

  if (isPresent(shoebox.retrieve('meta-store'))) {
    const {availableProjectVersions, projectRevMap} = shoebox.retrieve('meta-store');
    metaStore.initializeStore(availableProjectVersions, projectRevMap);
  }

}

export default {
  name: 'ember-meta-store',
  initialize
};
