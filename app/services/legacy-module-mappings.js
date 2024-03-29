import fetch from 'fetch';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const LOCALNAME_CONVERSIONS = {
  Object: 'EmberObject',
  Array: 'EmberArray',
  Error: 'EmberError',
};

export default class LegacyModuleMappingsService extends Service {
  @tracked mappings;

  async initMappings() {
    try {
      let response = await this.fetch();
      let mappings = await response.json();
      let newMappings = this.buildMappings(mappings);
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

  fetch() {
    return fetch('/assets/mappings.json');
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
      (element) => element.module === oldModuleName
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
      (element) => element.export === name && element.module === module
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
