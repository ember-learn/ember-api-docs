import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
  name: attr(),
  githubUrl: attr(),
  projectVersions: hasMany('project-version', {async: true})
});
