import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DataModuleRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  legacyModuleMappings;

  model(params) {
    return {
      moduleName: params.module.substr(0, params.module.lastIndexOf('.')),
      mappings: this.legacyModuleMappings.buildMappings(
        this.legacyModuleMappings.legacyMappings,
      ),
    };
  }

  redirect(model) {
    let { moduleName, mappings } = model;
    if (moduleName.indexOf('ember-data') === 0) {
      moduleName = '@' + moduleName;
    }
    let mappingInfo = this.legacyModuleMappings.getNewModuleFromOld(
      moduleName,
      mappings,
    );
    if (mappingInfo.module === '@ember-data') {
      return this.router.transitionTo(
        `project-version`,
        'ember-data',
        'release',
      );
    } else {
      return this.router.transitionTo(
        `project-version.modules.module`,
        'ember-data',
        'release',
        mappingInfo.module,
      );
    }
  }
}
