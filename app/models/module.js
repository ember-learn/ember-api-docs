import { belongsTo, attr } from '@ember-data/model';
import ClassModel from './class';

export default class Module extends ClassModel {
  @attr()
  submodules;

  @attr()
  publicclasses;

  @attr()
  privateclasses;

  @attr()
  namespaces;

  @attr()
  parent;

  @attr()
  staticfunctions;

  @attr()
  allstaticfunctions;

  @belongsTo('project-version', { inverse: 'modules' })
  projectVersion;
}
