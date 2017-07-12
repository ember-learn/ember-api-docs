import ClassModel from './class';
import DS from 'ember-data';


export default ClassModel.extend({
  projectVersion: DS.belongsTo('project-version', {inverse: 'namespaces'})
});
