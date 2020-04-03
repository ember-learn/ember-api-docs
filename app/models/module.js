import { belongsTo, attr } from '@ember-data/model';
import ClassModel from './class';

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
