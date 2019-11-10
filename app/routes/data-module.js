import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  legacyModuleMappings: service(),

  model(params) {
    return this.legacyModuleMappings.fetch()
      .then((response) => response.json())
      .then((mappings) => {
        return {
          moduleName: params.module.substr(0, params.module.lastIndexOf('.')),
          mappings: this.legacyModuleMappings.buildMappings(mappings)
        };
      });
  },

  redirect(model) {
    let { moduleName, mappings } = model;
    if (moduleName.indexOf('ember-data') === 0) {
      moduleName = '@' + moduleName;
    }
    let mappingInfo = this.legacyModuleMappings.getNewModuleFromOld(moduleName, mappings);
    return this.transitionTo(`project-version.modules.module`,
      'ember-data',
      'release',
      mappingInfo.module);
  }

});
