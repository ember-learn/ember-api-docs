import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ClassRoute extends Route {
  @service
  legacyModuleMappings;

  model(params) {
    return this.legacyModuleMappings
      .fetch()
      .then((response) => response.json())
      .then((mappings) => {
        let ret = {
          mappings: this.legacyModuleMappings.buildMappings(mappings),
          className: params['class'].substr(
            0,
            params['class'].lastIndexOf('.')
          ),
        };
        return ret;
      });
  }

  redirect(model) {
    let mappedInfo = this.legacyModuleMappings.getNewClassFromOld(
      model.className,
      model.mappings
    );
    if (!mappedInfo.error && model.className !== mappedInfo.newName) {
      let { itemType, newName, newModule } = mappedInfo;
      if (itemType === 'class') {
        return this.transitionTo(
          `project-version.classes.class`,
          'ember',
          'release',
          newName
        );
      } else {
        return this.transitionTo(
          `project-version.functions.function`,
          'ember',
          'release',
          newModule,
          newName
        );
      }
    }
    return this.transitionTo('project-version', 'ember', 'release');
  }
}
