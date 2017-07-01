import Ember from 'ember';

const {isPresent} = Ember;

export function initialize(appInstance) {
  const metaStore = appInstance.lookup('service:meta-store');
  const fastBootService = appInstance.lookup('service:fastboot');
  const headData = appInstance.lookup('service:headData');

  headData.set('availableProjectVersions', metaStore.get('availableProjectVersions'));


  const shoebox = fastBootService.get('shoebox');

  if (typeof FastBoot !== 'undefined') {
    shoebox.put('meta-store', metaStore.getProperties('availableProjectVersions', 'projectRevMap'));
  } else if (isPresent(shoebox.retrieve('meta-store'))) {
    const {availableProjectVersions, projectRevMap} = shoebox.retrieve('meta-store');
    metaStore.initializeStoreFromShoebox(availableProjectVersions, projectRevMap);
  }

}

export default {
  name: 'ember-meta-store',
  initialize
};
