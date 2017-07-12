import DS from 'ember-data';


export default DS.Model.extend({
  name: DS.attr(),
  githubUrl: DS.attr(),
  projectVersions: DS.hasMany('project-version', {async: true})
});
