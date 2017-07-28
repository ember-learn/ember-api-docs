import Route from '@ember/routing/route';
import { set } from '@ember/object';
import Ember from 'ember';
import ENV from 'ember-api-docs/config/environment';

const {
  inject
} = Ember;

export default Route.extend({
  headData: inject.service(),

  title(tokens) {
    const [version, entity] = tokens;
    const compactVersion = version.split('.').slice(0, 2).join('.');

    const title = `${[entity, compactVersion].join(' - ')} - Ember API Documentation`;

    set(this, 'headData.title', title);
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    return title;
  }

});
