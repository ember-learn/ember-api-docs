import Ember from 'ember';
import ClassController from '../classes/class';
import _ from 'lodash';


export default ClassController.extend({
  filterData: Ember.inject.service(),
  showPrivateClasses: Ember.computed.alias('filterData.sideNav.showPrivate'),

  submodules: Ember.computed('model', function() {
    return Object.keys(this.get('model.submodules'));
  }),

  namespaces: Ember.computed('model', function() {
    return Object.keys(this.get('model.namespaces'));
  }),

  classes: Ember.computed('model', 'showPrivateClasses', function() {
    if (this.get('showPrivateClasses')) {
      return this.get('model.publicclasses').concat(this.get('model.privateclasses'));
    }
    return this.get('model.publicclasses');
  }),

  classesAndNamespaces: Ember.computed('classes', 'namespaces', function () {
    return _.uniq(_.union(this.get('namespaces'), this.get('classes')).sort(), true);
  })

});
