export function initialize(appInstance) {
  const metaStore = appInstance.lookup('service:meta-store');
  const shoebox = appInstance.lookup('service:fastboot').get('shoebox');

  shoebox.put('meta-store', metaStore.getProperties('availableProjectVersions', 'projectRevMap'));
}

export default {
  name: 'ember-meta-store',
  initialize
};
