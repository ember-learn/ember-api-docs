import Ember from 'ember';
import fetch from 'fetch';
import { task } from 'ember-concurrency';
import ENV from 'ember-api-docs/config/environment';

export default Ember.Service.extend({

  init() {
    this.get('initMappings').perform();
  },

  initMappings: task(function * () {
    try {
      let response = yield fetch(`${ENV.API_HOST}/assets/mappings.json`);
      let mappings = yield response.json();
      this.set('mappings', mappings);
    } catch (e) {
      this.set('mappings', []);
    }
  }),

  hasFunctionMapping(name, module) {
    if (!this.get('initMappings.isIdle')) {
      return false;
    }
    let filtered = this.mappings.filter(element => element.export === name && element.module === module);
    return filtered.length > 0;
  },

  hasClassMapping(name, module) {
    if (!this.get('initMappings.isIdle')) {
      return false;
    }
    return this.mappings.filter(element => element.localName === name).length > 0;
  }

});
