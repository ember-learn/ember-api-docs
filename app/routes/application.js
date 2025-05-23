import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ENV from 'ember-api-docs/config/environment';

export default class ApplicationRoute extends Route {
  @service
  headData;

  @service
  legacyModuleMappings;

  async afterModel() {
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    await this.legacyModuleMappings.initMappings();
    return super.afterModel(...arguments);
  }
}
