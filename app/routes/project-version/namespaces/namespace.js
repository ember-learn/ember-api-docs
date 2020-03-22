import ClassRoute from '../classes/class';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { inject as service } from '@ember/service';

export default ClassRoute.extend({
  templateName: 'project-version/classes/class',

  scrollPositionReset: service(),

  actions: {
    willTransition(transition) {
      this.scrollPositionReset.scheduleReset(transition);
    },

    didTransition() {
      this._super(...arguments);
      this.scrollPositionReset.handleScrollPosition();
    }
  },

  async model(params) {
    const { project, project_version: compactVersion } = this.paramsFor('project-version');

    let projectRecord = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(compactVersion, project, projectRecord, this.metaStore);
    const klass = params['namespace'];
    return this.find('namespace', `${project}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return { namespace: model.get('name') };
  }
});
