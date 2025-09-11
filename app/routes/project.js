import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service store;

  model({ project: projectName }) {
    let projectNameToLookUp = 'ember';

    // Accounts for old references to ember-data API docs
    if (projectName.indexOf('data') !== -1) {
      projectNameToLookUp = 'ember-data';
    }

    if (projectName.indexOf('cli') !== -1) {
      return this.router.transitionTo('ember-cli');
    }

    return this.store.findRecord('project', projectNameToLookUp, {
      includes: 'project-version',
    });
  }

  // Using redirect instead of afterModel so transition succeeds and returns 307 in fastboot
  redirect(project /*, transition */) {
    return this.router.transitionTo(
      'project-version',
      project.get('id'),
      'release',
    );
  }
}
