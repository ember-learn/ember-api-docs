import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
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
    return Object.keys(this.get('model.submodules'));
  }

  @computed('model.namespaces')
  get namespaces() {
    return Object.keys(this.get('model.namespaces'));
  }

  @computed('model.{privateclasses,publicclasses}', 'showPrivateClasses')
  get classes() {
    if (this.showPrivateClasses) {
      return this.get('model.publicclasses').concat(
        this.get('model.privateclasses')
      );
    }
    return this.get('model.publicclasses');
  }

  @computed('classes', 'namespaces')
  get classesAndNamespaces() {
    return uniq(union(this.namespaces, this.classes).sort(), true);
  }

  @computed('model.{allstaticfunctions,staticfunctions}', 'showPrivateClasses')
  get functionHeadings() {
    if (this.get('model.allstaticfunctions') && this.showPrivateClasses) {
      return Object.keys(this.get('model.allstaticfunctions')).sort();
    } else if (this.get('model.staticfunctions')) {
      return Object.keys(this.get('model.staticfunctions')).sort();
    }
    return {};
  }

  @computed('model.{allstaticfunctions,staticfunctions}', 'showPrivateClasses')
  get functions() {
    if (this.showPrivateClasses && this.get('model.allstaticfunctions')) {
      return this.get('model.allstaticfunctions');
    }
    return this.get('model.staticfunctions');
  }
}
