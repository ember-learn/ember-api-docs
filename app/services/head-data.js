import Ember from 'ember';
import HeadDataService from 'ember-cli-head/services/head-data';

const { computed, inject } = Ember;

export default HeadDataService.extend({

  router: inject.service(),

  projectVersionParam: null, //injected in project-version route
  projectVersionModel: null, // injected in project-version route

  canonicalURL: computed('projectVersionModel.{isRelease,isLTS}', 'router.currentURL', 'projectVersionParam', function() {
    const versionParam = this.get('projectVersionParam');
    if (versionParam !== 'release' && versionParam !== 'lts') {
      const versionModel = this.get('projectVersionModel');
      const currentURL = this.get('router.currentURL') || "";

      if (versionModel) {
        if (versionModel.get('isRelease')) {
          return currentURL.replace(versionParam, 'release');
        } else if (versionModel.get('isLTS')) {
          return currentURL.replace(versionParam, 'lts');
        }
      }

      return null;
    }

    return null;

  })

});
