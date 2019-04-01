import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ClassController from '../classes/class';
import uniq from 'lodash.uniq';
import union from 'lodash.union';

export default ClassController.extend({
  filterData: service(),
  showPrivateClasses: alias('filterData.sideNav.showPrivate'),

  submodules: computed('model', function() {
    return Object.keys(this.get('model.submodules'));
  }),

  namespaces: computed('model', function() {
    return Object.keys(this.get('model.namespaces'));
  }),

  classes: computed('model', 'showPrivateClasses', function() {
    if (this.showPrivateClasses) {
      return this.get('model.publicclasses').concat(this.get('model.privateclasses'));
    }
    return this.get('model.publicclasses');
  }),

  classesAndNamespaces: computed('classes', 'namespaces', function () {
    return uniq(union(this.namespaces, this.classes).sort(), true);
  }),

  functionHeadings: computed('model', 'showPrivateClasses', function () {
    if (this.get('model.allstaticfunctions') && this.showPrivateClasses) {
      return Object.keys(this.get('model.allstaticfunctions')).sort();
    } else if (this.get('model.staticfunctions')) {
      return Object.keys(this.get('model.staticfunctions')).sort();
    }
    return {};
  }),

  functions: computed('model', 'showPrivateClasses', function () {
    if (this.showPrivateClasses && this.get('model.allstaticfunctions')) {
      return this.get('model.allstaticfunctions');
    }
    return this.get('model.staticfunctions');
  })

});
