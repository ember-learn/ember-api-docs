import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
  rev: attr('string'),
  githubUrl: attr(),
  projectVersions: hasMany('project-version', {async: true})
});
