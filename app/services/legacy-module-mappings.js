import fetch from 'fetch';
import { task } from 'ember-concurrency';
import config from 'ember-api-docs/config/environment';
import Service from '@ember/service';

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
      let response = yield this.fetch();
      let mappings = yield response.json();
      let newMappings = this.buildMappings(mappings);
      this.set('mappings', newMappings);
    } catch (e) {
      this.set('mappings', []);
    }
  }),

  buildMappings(mappings) {
    return mappings.map(item => {
      let newItem = Object.assign({}, item);
      if (LOCALNAME_CONVERSIONS[newItem.localName]) {
        newItem.localName = LOCALNAME_CONVERSIONS[newItem.localName];
      }
      return newItem;
    });
  },

  fetch() {
    return fetch(`${config.APP.cdnUrl}/assets/mappings.json`);
  },

  getModule(name, documentedModule) {
    if (!this.get('initMappings.isIdle')) {
      return '';
    }
    let matches = this.mappings.filter(element => element.localName === name);
    return matches.length > 0 ? matches[0].module : documentedModule;
  },

  getNewClassFromOld(oldClassName, mappings) {
    let matches = mappings.filter(element => element.global === oldClassName);
    if (matches.length > 0) {
      if (matches[0].localName) {
        return {
          itemType: 'class',
          newModule: matches[0].module,
          newName: matches[0].localName
        }
      } else {
        return {
          itemType: 'function',
          newModule: matches[0].module,
          newName: matches[0].export
        }
      }

    } else {
      return {
        itemType: 'class',
        newName: oldClassName
      }
    }
  },

  getNewModuleFromOld(oldModuleName, mappings) {
    let matches = mappings.filter(element => element.module === oldModuleName);
    if (matches.length > 0) {
      return {
        module: matches[0].replacement.module
      };
    } else {
      return {
        module: oldModuleName
      };
    }
  },


  hasFunctionMapping(name, module) {
    if (!this.get('initMappings.isIdle')) {
      return false;
    }
    let filtered = this.mappings.filter(element => element.export === name && element.module === module);
    return filtered.length > 0;
  },

  hasClassMapping(name) {
    if (!this.get('initMappings.isIdle')) {
      return false;
    }
    return this.mappings.filter(element => element.localName === name).length > 0;
  }

});
