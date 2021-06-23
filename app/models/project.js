import Model, { hasMany, attr } from '@ember-data/model';

export default class Project extends Model {
  @attr()
  name;

  @attr()
  githubUrl;

  @hasMany('project-version', { async: true })
  projectVersions;
}
