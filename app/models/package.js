import ClassModel from './class';
import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default ClassModel.extend({
  subpackages: attr(),
  publicclasses: attr(),
  privateclasses: attr(),
  namespaces: attr(),
  parent: attr(),

  projectVersion: belongsTo('project-version', {inverse: 'packages'})
});
