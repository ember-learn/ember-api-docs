import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  legacyModuleMappings: service(),

  model(params) {
    return this.get('legacyModuleMappings').fetch()
      .then((response) => response.json())
      .then((mappings) => {
        return {
          mappings: this.get('legacyModuleMappings').buildMappings(mappings),
          className: params['class'].substr(0, params['class'].lastIndexOf('.'))
        }
      })
  },

  redirect(model) {
    let mappingInfo = this.get('legacyModuleMappings').getNewClassFromOld(model.className, model.mappings)
    let { newName } = mappingInfo;
    if (!mappingInfo.error) {
      return this.transitionTo(`project-version.classes.class`,
        'ember-data',
        'release',
        newName);
    } else {
      return this.transitionTo('project-version',
        'ember',
        'release');
    }

  }

});
