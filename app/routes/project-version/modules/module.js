import ClassRoute from '../classes/class';
import { inject as service } from '@ember/service';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default ClassRoute.extend({
  async model(params) {
    const { project, project_version: compactVersion } = this.paramsFor('project-version');

    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(compactVersion, project, projectObj, this.metaStore);
    let klass = params['module'];

    if (
      !~klass.indexOf(project) &&
      !['rsvp', 'jquery', '@glimmer/component', '@glimmer/tracking'].includes(klass)
    ) {
      klass = `${project}-${klass}`;
    }

    return this.find('module', `${project}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return { module: model.get('name') };
  },

  scrollPositionReset: service(),

  actions: {
    willTransition(transition) {
      this.scrollPositionReset.scheduleReset(transition);
    },

    didTransition() {
      this._super(...arguments);
      this.scrollPositionReset.handleScrollPosition();
    }
  }
});
