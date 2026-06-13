import { Model, attr, hasMany, belongsTo } from '@warp-drive/legacy/model';
import getCompactVersion from '../utils/get-compact-version';

export default class ProjectVersionModel extends Model {
  @attr version;
  @hasMany('class', { async: true, inverse: null }) classes;
  @hasMany('module', { async: true, inverse: null }) modules;
  @hasMany('namespace', { async: true, inverse: null }) namespaces;
  @hasMany('class', { async: true, inverse: null }) 'public-classes';
  @hasMany('class', { async: true, inverse: null }) 'private-classes';
  @hasMany('module', { async: true, inverse: null }) 'public-modules';
  @hasMany('module', { async: true, inverse: null }) 'private-modules';
  @hasMany('namespace', { async: true, inverse: null }) 'public-namespaces';
  @hasMany('namespace', { async: true, inverse: null }) 'private-namespaces';
  @belongsTo('project', { async: false, inverse: 'projectVersions' }) project;

  get compactVersion() {
    return getCompactVersion(this.version);
  }
}
