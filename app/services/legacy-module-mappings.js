import Service from '@ember/service';
import fetch from 'fetch';
import { task } from 'ember-concurrency';
import config from 'ember-api-docs/config/environment';

const LOCALNAME_CONVERSIONS = {
  Object: 'EmberObject',
  Array: 'EmberArray',
  Error: 'EmberError'
};

export default Service.extend({

  init() {
    this.get('initMappings').perform();
  },

  initMappings: task(function * () {
    try {
      let response = yield fetch(`${config.APP.cdnUrl}/assets/mappings.json`);
      let mappings = yield response.json();
      let newMappings = mappings.map(item => {
        let newItem = Object.assign({}, item);
        if (LOCALNAME_CONVERSIONS[newItem.localName]) {
          newItem.localName = LOCALNAME_CONVERSIONS[newItem.localName];
        }
        return newItem;
      });
      this.set('mappings', newMappings);
    } catch (e) {
      this.set('mappings', []);
    }
  }),

  getModule(name, documentedModule) {
    if (!this.get('initMappings.isIdle')) {
      return '';
    }
    let matches = this.mappings.filter(element => element.localName === name);
    return matches.length > 0 ? matches[0].module : documentedModule;
  },

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
