import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {

  async model(params, transition) {
    const lookupParams = (routeName) => {
      let route = transition.routeInfos.find(({name}) => name === routeName);
      return route ? route.params : {}
    };

    let {
      project: projectID,
      project_version: compactVersion
    } = lookupParams('project-version');

    let projectObj = await this.store.findRecord('project', projectID);
    let projectVersion = getFullVersion(compactVersion, projectID, projectObj, this.metaStore);
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
