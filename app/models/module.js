import ClassModel from './class';
import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default ClassModel.extend({
  submodules: attr(),
  publicclasses: attr(),
  privateclasses: attr(),
  namespaces: attr(),
  parent: attr(),
  staticfunctions: attr(),
  allstaticfunctions: attr(),
  projectVersion: belongsTo('project-version', {inverse: 'modules'})
});
