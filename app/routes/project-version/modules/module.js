import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';

export default ClassRoute.extend(ScrollTracker, {

  async model(params, transition) {
    let projectID = transition.params['project-version'].project;
    let projectObj = await this.store.findRecord('project', projectID);
    let compactVersion = transition.params['project-version'].project_version;
    let projectVersion;
    if (compactVersion === 'release') {
      let versions = projectObj.get('projectVersions').toArray();
      projectVersion = getLastVersion(versions);
      compactVersion = getCompactVersion(projectVersion);
    } else {
      projectVersion = this.get('metaStore').getFullVersion(projectID, compactVersion);
    }
    let klass = params['module'];
    if (!~klass.indexOf(projectID) && klass !== 'rsvp' && klass !== 'jquery') {
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
