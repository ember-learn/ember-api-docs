import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DataClassRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  legacyModuleMappings;

  model(params) {
    return {
      mappings: this.legacyModuleMappings.buildMappings(
        this.legacyModuleMappings.legacyMappings
      ),
      className: params['class'].substr(0, params['class'].lastIndexOf('.')),
    };
  }

  redirect(model) {
    let mappingInfo = this.legacyModuleMappings.getNewClassFromOld(
      model.className,
      model.mappings
    );
    let { newName } = mappingInfo;
    if (newName.substr(0, 3) === 'DS.') {
      newName = newName.substr(3);
    }
    if (!mappingInfo.error) {
      return this.router.transitionTo(
        `project-version.classes.class`,
        'ember-data',
        'release',
        newName
      );
    } else {
      return this.router.transitionTo('project-version', 'ember', 'release');
    }
  }
}
