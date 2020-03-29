import ClassRoute from '../classes/class';
import ScrollTracker from '../../../mixins/scroll-tracker';
import getFullVersion from '../../../utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {
  async model(params, transition) {
    let projectID = transition.params['project-version'].project;
    let projectObj = await this.store.findRecord('project', projectID);
    let compactVersion = transition.params['project-version'].project_version;
    let projectVersion = getFullVersion(projectObj, compactVersion);
    let klass = params['module'];
    if (
      !~klass.indexOf(projectID) &&
      klass !== 'rsvp' &&
      klass !== 'jquery' &&
      klass !== '@glimmer/component' &&
      klass !== '@glimmer/tracking'
    ) {
      klass = `${projectID}-${klass}`;
    }
    return this.find('module', `${projectID}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      module: model.get('name')
    };
  }
});
