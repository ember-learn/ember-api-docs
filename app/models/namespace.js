import ClassModel from './class';
import DS from 'ember-data';

const { belongsTo } = DS;

export default ClassModel.extend({
  projectVersion: belongsTo('project-version', {inverse: 'namespaces'})
});
