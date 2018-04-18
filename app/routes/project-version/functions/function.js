import Route from '@ember/routing/route';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({

  headData: service(),
  metaStore: service(),
  scrollPositionReset: service(),

  titleToken(model) {
    return get(model, 'fn.name');
  },

  async model(params, transition) {
    let projectID = transition.params['project-version'].project;
    let projectObj = await this.store.findRecord('project', projectID);
    let compactVersion = transition.params['project-version'].project_version;
    let projectVersion = getFullVersion(compactVersion, projectID, projectObj, this.get('metaStore'));
    let className = params['module'];
    let functionName = params['fn'];
    let fnModule;
    try {
      fnModule = await this.store.find('class', `${projectID}-${projectVersion}-${className}`);
    } catch (e) {
      fnModule = await this.store.find('namespace', `${projectID}-${projectVersion}-${className}`);
    }
    return {
      fnModule,
      fn: this.getFunctionObjFromList(fnModule, functionName)
    };
  },

  getFunctionObjFromList(classObj, functionName) {
    return classObj.get('methods').find(fn => {
      return fn.name === functionName;
    })
  },

  activate() {
    this.get('scrollPositionReset').doReset();
  }

});
