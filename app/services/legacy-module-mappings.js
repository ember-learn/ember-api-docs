import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import legacyMappings from 'ember-rfc176-data/mappings.json';

const LOCALNAME_CONVERSIONS = {
  Object: 'EmberObject',
  Array: 'EmberArray',
  Error: 'EmberError',
};

export default class LegacyModuleMappingsService extends Service {
  @tracked mappings;
  legacyMappings = legacyMappings;

  async initMappings() {
    try {
      let newMappings = this.buildMappings(legacyMappings);
      this.mappings = newMappings;
    } catch (e) {
      this.mappings = [];
    }
  }

  buildMappings(mappings) {
    return mappings.map((item) => {
      let newItem = Object.assign({}, item);
      if (LOCALNAME_CONVERSIONS[newItem.localName]) {
        newItem.localName = LOCALNAME_CONVERSIONS[newItem.localName];
      }
      return newItem;
    });
  }

  getModule(name, documentedModule) {
    if (!this.mappings) {
      return '';
    }
    let matches = this.mappings.filter((element) => element.localName === name);
    return matches.length > 0 ? matches[0].module : documentedModule;
  }

  getNewClassFromOld(oldClassName, mappings) {
    let matches = mappings.filter((element) => element.global === oldClassName);
    if (matches.length > 0) {
      if (matches[0].localName) {
        return {
          itemType: 'class',
          newModule: matches[0].module,
          newName: matches[0].localName,
        };
      } else {
        return {
          itemType: 'function',
          newModule: matches[0].module,
          newName: matches[0].export,
        };
      }
    } else {
      return {
        itemType: 'class',
        newName: oldClassName,
      };
    }
  }

  getNewModuleFromOld(oldModuleName, mappings) {
    let matches = mappings.filter(
      (element) => element.module === oldModuleName,
    );
    if (matches.length > 0) {
      return {
        module: matches[0].replacement.module,
      };
    } else {
      return {
        module: oldModuleName,
      };
    }
  }

  hasFunctionMapping(name, module) {
    if (!this.mappings) {
      return false;
    }
    let filtered = this.mappings.filter(
      (element) => element.export === name && element.module === module,
    );
    return filtered.length > 0;
  }

  hasClassMapping(name) {
    if (!this.mappings) {
      return false;
    }
    return (
      this.mappings.filter((element) => element.localName === name).length > 0
    );
  }
}
