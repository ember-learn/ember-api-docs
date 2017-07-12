import Ember from 'ember';
import ENV from 'ember-api-docs/config/environment';


export default Ember.Route.extend({
  headData: Ember.inject.service(),

  title(tokens) {
    const [version, entity] = tokens;
    const compactVersion = version.split('.').slice(0, 2).join('.');

    const title = `${[entity, compactVersion].join(' - ')} - Ember API Documentation`;

    Ember.set(this, 'headData.title', title);
    Ember.set(this, 'headData.cdnDomain', ENV.API_HOST);
    return title;
  }

});
