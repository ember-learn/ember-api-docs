import ClassModel from './class';
import DS from 'ember-data';

const { attr } = DS;

export default ClassModel.extend({
  submodules: attr(),
  classes: attr(),
  namespaces: attr()
});
