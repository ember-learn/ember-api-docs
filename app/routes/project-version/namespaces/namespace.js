import ClassRoute from '../classes/class';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import getFullVersion from 'ember-api-docs/utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {
  templateName: 'project-version/classes/class',

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
    const klass = params['namespace'];
    return this.find('namespace', `${projectID}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      namespace: model.get('name')
    };
  }
});
