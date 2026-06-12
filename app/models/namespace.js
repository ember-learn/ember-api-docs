import { belongsTo } from '@warp-drive/legacy/model';
import ClassModel from './class';

export default class Namespace extends ClassModel {
  @belongsTo('project-version', { async: false, inverse: null })
  projectVersion;
}
