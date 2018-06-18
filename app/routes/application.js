import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import ENV from 'ember-api-docs/config/environment';
import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import esNavbarLinks from '../es-navbar-links';
import Route from '@ember/routing/route';

export default Route.extend({
  headData: service(),

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

  setupController(controller, model) {
    if (!model) {
      model = {};
    }

    model.esNavbarLinks = esNavbarLinks;
    this._super(controller, model);
  },

  afterModel() {
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    return this._super(...arguments);
  }

});
