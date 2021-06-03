/* eslint-disable ember/no-mixins */
import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {
  async model(params) {
    const { project, project_version: compactVersion } =
      this.paramsFor('project-version');

    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(
      compactVersion,
      project,
      projectObj,
      this.metaStore
    );
    let klass = params['module'];

    // These modules should not have `ember-` tacked onto the front of them
    // when forming the ids and URLs.
    let isNotEmber = klass.match(/@glimmer|rsvp|jquery/);

    if (!~klass.indexOf(project) && !isNotEmber) {
      klass = `${project}-${klass}`;
    }

    return this.find('module', `${project}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      module: model.get('name'),
    };
  },
});
