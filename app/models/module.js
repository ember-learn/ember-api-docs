import ClassModel from './class';
import DS from 'ember-data';


export default ClassModel.extend({
  submodules: DS.attr(),
  publicclasses: DS.attr(),
  privateclasses: DS.attr(),
  namespaces: DS.attr(),
  parent: DS.attr(),

  projectVersion: DS.belongsTo('project-version', {inverse: 'modules'})
});
