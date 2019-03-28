import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  legacyModuleMappings: service(),

  model(params) {
    return this.get('legacyModuleMappings').fetch()
      .then((response) => response.json())
      .then((mappings) => {
        return {
          moduleName: params.module.substr(0, params.module.lastIndexOf('.')),
          mappings: this.get('legacyModuleMappings').buildMappings(mappings)
        }
      })
  },

  redirect(model) {
    let mappingInfo = this.get('legacyModuleMappings').getNewModuleFromOld(model.moduleName, model.mappings);
    if (!mappingInfo.error && model.moduleName !== mappingInfo.module) {
      return this.transitionTo(`project-version.modules.module`,
        'ember',
        'release',
        mappingInfo.module);
    }
    return this.transitionTo('project-version', 'ember', 'release');
  }

});
