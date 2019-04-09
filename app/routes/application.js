import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'ember-api-docs/config/environment';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';

export default Route.extend({
  headData: service(),
  legacyModuleMappings: service(),

  title(tokens) {
    let [version, entity] = tokens;
    if (!entity) {
      entity = 'Ember';
    }
    if (version) {
      const compactVersion = getCompactVersion(version);
      const title = `${[entity, compactVersion].join(' - ')} - Ember API Documentation`;
      set(this, 'headData.title', title);
      return title;
    }
    return '';
  },
  async afterModel() {
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    await this.legacyModuleMappings.initMappings();
    return this._super(...arguments);
  }

});
