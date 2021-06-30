import { belongsTo } from '@ember-data/model';
import ClassModel from './class';

export default class Namespace extends ClassModel {
  @belongsTo('project-version', { inverse: 'namespaces' })
  projectVersion;
}
