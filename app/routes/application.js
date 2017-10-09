import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'ember-api-docs/config/environment';

export default Route.extend({
  headData: service(),

  title(tokens) {
    const [version, entity] = tokens;
    if (version) {
      const compactVersion = version.split('.').slice(0, 2).join('.');

      const title = `${[entity, compactVersion].join(' - ')} - Ember API Documentation`;

      set(this, 'headData.title', title);
      set(this, 'headData.cdnDomain', ENV.API_HOST);
      return title;
    }
    return '';
  }

});
