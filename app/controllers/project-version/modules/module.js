import Ember from 'ember';
import ClassController from '../classes/class';
import uniq from 'npm:lodash.uniq';
import union from 'npm:lodash.union';

const { computed, inject } = Ember;

export default ClassController.extend({
  filterData: inject.service(),
  showPrivateClasses: computed.alias('filterData.sideNav.showPrivate'),

  submodules: computed('model', function() {
    return Object.keys(this.get('model.submodules'));
  }),

  namespaces: computed('model', function() {
    return Object.keys(this.get('model.namespaces'));
  }),

  classes: computed('model', 'showPrivateClasses', function() {
    if (this.get('showPrivateClasses')) {
      return this.get('model.publicclasses').concat(this.get('model.privateclasses'));
    }
    return this.get('model.publicclasses');
  }),

  classesAndNamespaces: computed('classes', 'namespaces', function () {
    return uniq(union(this.get('namespaces'), this.get('classes')).sort(), true);
  })

});
