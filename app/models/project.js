import { Model, hasMany, attr } from '@warp-drive/legacy/model';

export default class Project extends Model {
  @attr()
  name;

  @attr()
  githubUrl;

  @hasMany('project-version', { async: true, inverse: 'project' })
  projectVersions;
}
