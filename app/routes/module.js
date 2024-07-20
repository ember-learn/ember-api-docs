import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ModuleRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  legacyModuleMappings;

  model(params) {
    return {
      moduleName: params.module.substr(0, params.module.lastIndexOf('.')),
      mappings: this.legacyModuleMappings.buildMappings(
        this.legacyModuleMappings.legacyMappings
      ),
    };
  }

  redirect(model) {
    let mappingInfo = this.legacyModuleMappings.getNewModuleFromOld(
      model.moduleName,
      model.mappings
    );
    if (!mappingInfo.error && model.moduleName !== mappingInfo.module) {
      return this.router.transitionTo(
        `project-version.modules.module`,
        'ember',
        'release',
        mappingInfo.module
      );
    }
    return this.router.transitionTo('project-version', 'ember', 'release');
  }
}
