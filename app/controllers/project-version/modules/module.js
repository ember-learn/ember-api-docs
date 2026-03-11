// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';
import ClassController from '../classes/class';
import uniq from 'lodash.uniq';
import union from 'lodash.union';

export default class ModuleController extends ClassController {
  @service
  filterData;

  @alias('filterData.sideNav.showPrivate')
  showPrivateClasses;

  @computed('model.submodules')
  get submodules() {
    return Object.keys(this.model.submodules);
  }

  @computed('model.namespaces')
  get namespaces() {
    return Object.keys(this.model.namespaces);
  }

  @computed('model.{privateclasses,publicclasses}', 'showPrivateClasses')
  get classes() {
    if (this.showPrivateClasses) {
      return this.model.publicclasses.concat(this.model.privateclasses);
    }
    return this.model.publicclasses;
  }

  @computed('classes', 'namespaces')
  get classesAndNamespaces() {
    return uniq(union(this.namespaces, this.classes).sort(), true);
  }

  @computed('model.{allstaticfunctions,staticfunctions}', 'showPrivateClasses')
  get functionHeadings() {
    if (this.model.allstaticfunctions && this.showPrivateClasses) {
      return Object.keys(this.model.allstaticfunctions).sort();
    } else if (this.model.staticfunctions) {
      return Object.keys(this.model.staticfunctions).sort();
    }
    return {};
  }

  @computed('model.{allstaticfunctions,staticfunctions}', 'showPrivateClasses')
  get functions() {
    if (this.showPrivateClasses && this.model.allstaticfunctions) {
      return this.model.allstaticfunctions;
    }
    return this.model.staticfunctions;
  }
}
