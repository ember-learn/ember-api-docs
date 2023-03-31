import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service store;

  async redirect() {
    // redirect to first available project ember => ember-data => ember-cli
    let foundProject = 'ember-cli';
    try {
      await this.store.findRecord('project', 'ember', {
        includes: 'project-version',
      });
      foundProject = 'ember';
    } catch {
      try {
        await this.store.findRecord('project', 'ember-data', {
          includes: 'project-version',
        });
        foundProject = 'ember-data';
      } catch (e) {
        foundProject = 'ember-cli';
      }
    }

    if (foundProject === 'ember-cli') {
      return this.router.transitionTo('ember-cli');
    }
    return this.router.transitionTo('project-version', foundProject, 'release');
  }
}
