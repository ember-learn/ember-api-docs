import Ember from 'ember';
import ClassController from './class';
import _ from 'lodash/lodash';

const { computed } = Ember;

export default ClassController.extend({
  submodules: computed('model', function() {
    return Object.keys(this.get('model.submodules'));
  }),

  namespaces: computed('model', function() {
    return Object.keys(this.get('model.namespaces'));
  }),

  classes: computed('model', function() {
    return Object.keys(this.get('model.classes'));
  }),

  classesAndNamespaces: computed('classes', 'namespaces', function () {
    return _.uniq(_.union(this.get('namespaces'), this.get('classes')).sort(), true);
  })

});
