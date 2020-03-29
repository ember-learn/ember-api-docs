import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {
  templateName: 'project-version/classes/class',

  async model(params) {
    const { project, project_version: compactVersion } = this.paramsFor('project-version');

    let projectRecord = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(compactVersion, project, projectRecord, this.metaStore);
    const klass = params['namespace'];
    return this.find('namespace', `${project}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      namespace: model.get('name')
    };
  }
});
