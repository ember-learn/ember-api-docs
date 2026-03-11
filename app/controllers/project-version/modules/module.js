import { service } from '@ember/service';
import ClassController from '../classes/class';
import uniq from 'lodash.uniq';
import union from 'lodash.union';

export default class ModuleController extends ClassController {
  @service
  filterData;

  get showPrivateClasses() {
    return this.filterData.showPrivateClasses;
  }

  get submodules() {
    return Object.keys(this.model.submodules);
  }

  get namespaces() {
    return Object.keys(this.model.namespaces);
  }

  get classes() {
    if (this.showPrivateClasses) {
      return this.model.publicclasses.concat(this.model.privateclasses);
    }
    return this.model.publicclasses;
  }

  get classesAndNamespaces() {
    return uniq(union(this.namespaces, this.classes).sort(), true);
  }

  get functionHeadings() {
    if (this.model.allstaticfunctions && this.showPrivateClasses) {
      return Object.keys(this.model.allstaticfunctions).sort();
    } else if (this.model.staticfunctions) {
      return Object.keys(this.model.staticfunctions).sort();
    }
    return {};
  }

  get functions() {
    if (this.showPrivateClasses && this.model.allstaticfunctions) {
      return this.model.allstaticfunctions;
    }
    return this.model.staticfunctions;
  }
}
