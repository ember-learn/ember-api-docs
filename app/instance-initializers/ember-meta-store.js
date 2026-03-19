import { isPresent } from '@ember/utils';

export function initialize(appInstance) {
  const metaStore = appInstance.lookup('service:meta-store');
  const shoebox = appInstance.lookup('service:shoebox');
  const isPrerendering = appInstance.lookup('service:prerender').isPrerendering;

  if (isPrerendering) {
    shoebox.put(
      'meta-store',
      metaStore.getProperties('availableProjectVersions', 'projectRevMap'),
    );
  } else if (isPresent(shoebox.retrieve('meta-store'))) {
    const { availableProjectVersions, projectRevMap } =
      shoebox.retrieve('meta-store');
    metaStore.initializeStore(availableProjectVersions, projectRevMap);
  }
}

export default {
  name: 'ember-meta-store',
  initialize,
};
