import ClassModel from './class';
import { attr, belongsTo } from '@ember-data/model';

export default ClassModel.extend({
  submodules: attr(),
  publicclasses: attr(),
  privateclasses: attr(),
  namespaces: attr(),
  parent: attr(),
  staticfunctions: attr(),
  allstaticfunctions: attr(),
  projectVersion: belongsTo('project-version', { inverse: 'modules' })
});
