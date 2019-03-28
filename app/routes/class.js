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
    let mappedInfo = this.get('legacyModuleMappings').getNewClassFromOld(model.className, model.mappings);
    if (!mappedInfo.error && model.className !== mappedInfo.newName) {
      let { itemType, newName, newModule } = mappedInfo;
      if (itemType === 'class') {
        return this.transitionTo(`project-version.classes.class`,
          'ember',
          'release',
          newName);
      } else {
        return this.transitionTo(`project-version.functions.function`,
          'ember',
          'release',
          newModule,
          newName)
      }

    }
    return this.transitionTo('project-version', 'ember', 'release')

  }

});
