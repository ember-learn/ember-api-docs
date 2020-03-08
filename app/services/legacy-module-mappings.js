import Service from '@ember/service';
import rfcMappings from 'ember-rfc176-data';
import { computed } from '@ember/object';

const LOCAL_NAME_CONVERSIONS = {
  Object: 'EmberObject',
  Array: 'EmberArray',
  Error: 'EmberError'
};

export default Service.extend({
  mappings: computed(function() {
    try {
      return rfcMappings.map(item => {
        let newItem = Object.assign({}, item);
        if (LOCAL_NAME_CONVERSIONS[newItem.localName]) {
          newItem.localName = LOCAL_NAME_CONVERSIONS[newItem.localName];
        }
        return newItem;
      });
    } catch (e) {
      return [];
    }
  }),

  getModule(name, documentedModule) {
    if (!this.mappings) {
      return '';
    }

    let match = this.mappings.find(element => element.localName === name);
    return match ? match.module : documentedModule;
  },

  getNewClassFromOld(oldClassName, mappings) {
    let match = mappings.find(element => element.global === oldClassName);

    if (match) {
      if (match.localName) {
        return {
          itemType: 'class',
          newModule: match.module,
          newName: match.localName
        };
      } else {
        return {
          itemType: 'function',
          newModule: match.module,
          newName: match.export
        };
      }
    } else {
      return {
        itemType: 'class',
        newName: oldClassName
      };
    }
  },

  getNewModuleFromOld(oldModuleName, mappings) {
    let match = mappings.find(element => element.module === oldModuleName);
    return { module: match ? match.replacement.module : oldModuleName };
  },

  hasFunctionMapping(name, moduleName) {
    if (!this.mappings) {
      return false;
    }

    return Boolean(
      this.mappings.find(element => element.export === name && element.module === moduleName)
    );
  },

  hasClassMapping(name) {
    if (!this.mappings) {
      return false;
    }

    return Boolean(this.mappings.find(element => element.localName === name));
  }
});
