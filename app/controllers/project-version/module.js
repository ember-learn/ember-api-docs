import Ember from 'ember';
import ClassController from './class';

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
  })
});
