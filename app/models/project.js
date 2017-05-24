import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
  name: attr(),
  githubUrl: attr(),
  projectVersions: hasMany('project-version', {async: true})
});
