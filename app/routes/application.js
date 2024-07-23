import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ENV from 'ember-api-docs/config/environment';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';

export default class ApplicationRoute extends Route {
  @service
  headData;

  @service
  legacyModuleMappings;

  title() {
    let entity = this.headData.modelName;
    let version = this.headData.modelVersion;
    if (!entity) {
      entity = 'Ember';
    }
    if (version) {
      const compactVersion = getCompactVersion(version);
      const title = `${[entity, compactVersion].join(
        ' - '
      )} - Ember API Documentation`;
      set(this, 'headData.title', title);
      return title;
    }
    return '';
  }

  async afterModel() {
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    await this.legacyModuleMappings.initMappings();

    let entity = this.headData.modelName;
    let version = this.headData.modelVersion;
    if (!entity) {
      entity = 'Ember';
    }
    if (version) {
      const compactVersion = getCompactVersion(version);
      const title = `${[entity, compactVersion].join(
        ' - '
      )} - Ember API Documentation`;
      set(this, 'headData.title', title);
      return title;
    }
    return '';

    return super.afterModel(...arguments);
  }
}
