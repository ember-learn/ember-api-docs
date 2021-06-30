import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { set } from '@ember/object';
import createExcerpt from 'ember-api-docs/utils/create-excerpt';

export default class FunctionRoute extends Route {
  @service
  headData;

  @service
  metaStore;

  @service
  scrollPositionReset;

  titleToken(model) {
    return model?.fn?.name;
  }

  async model(params) {
    const pVParams = this.paramsFor('project-version');
    const { project, project_version: compactVersion } = pVParams;

    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(
      compactVersion,
      project,
      projectObj,
      this.metaStore
    );
    let className = params['module'];
    let functionName = params['fn'];
    let fnModule;

    try {
      fnModule = await this.store.find(
        'class',
        `${project}-${projectVersion}-${className}`
      );
    } catch (e) {
      fnModule = await this.store.find(
        'namespace',
        `${project}-${projectVersion}-${className}`
      );
    }

    return {
      fnModule,
      fn: fnModule.get('methods').find((fn) => fn.name === functionName),
    };
  }

  afterModel(model) {
    let description = model.fn.description;
    if (description) {
      set(this, 'headData.description', createExcerpt(description));
    }
  }

  getFunctionObjFromList(classObj, functionName) {
    return classObj.get('methods').find((fn) => {
      return fn.name === functionName;
    });
  }

  activate() {
    this.scrollPositionReset.doReset();
  }
}
