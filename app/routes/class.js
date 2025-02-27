/* eslint-disable prettier/prettier */
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ClassRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  legacyModuleMappings;

  model(params) {
    let ret = {
      mappings: this.legacyModuleMappings.buildMappings(
        this.legacyModuleMappings.legacyMappings
      ),
      className: params['class'].substr(0, params['class'].lastIndexOf('.')),
    };
    return ret;
  }

  redirect(model) {
    let mappedInfo = this.legacyModuleMappings.getNewClassFromOld(
      model.className,
      model.mappings
    );
    if (!mappedInfo.error && model.className !== mappedInfo.newName) {
      let { itemType, newName, newModule } = mappedInfo;
      if (itemType === 'class') {
        return this.router.transitionTo(
          `project-version.classes.class`,
          'ember',
          'release',
          newName
        );
      } else {
        return this.router.transitionTo(
          `project-version.functions.function`,
          'ember',
          'release',
          newModule,
          newName
        );
      }
    }
    return this.router.transitionTo('project-version', 'ember', 'release');
  }
}
