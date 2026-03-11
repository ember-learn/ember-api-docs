import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import getCompactVersion from '../utils/get-compact-version';

export default class ProjectVersionModel extends Model {
  @attr version;
  @hasMany('class', { async: true }) classes;
  @hasMany('module', { async: true }) modules;
  @hasMany('namespace', { async: true }) namespaces;
  @hasMany('class', { async: true }) 'public-classes';
  @hasMany('class', { async: true }) 'private-classes';
  @hasMany('module', { async: true }) 'public-modules';
  @hasMany('module', { async: true }) 'private-modules';
  @hasMany('namespace', { async: true }) 'public-namespaces';
  @hasMany('namespace', { async: true }) 'private-namespaces';
  @belongsTo('project') project;

  get compactVersion() {
    return getCompactVersion(this.version);
  }
}
