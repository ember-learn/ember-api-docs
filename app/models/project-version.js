import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  version: DS.attr(),
  classes: DS.hasMany('class', {async: true}),
  modules: DS.hasMany('module', {async: true}),
  namespaces: DS.hasMany('namespace', {async: true}),
  'public-classes': DS.hasMany('class', {async: true}),
  'private-classes': DS.hasMany('class', {async: true}),
  project: DS.belongsTo('project')
});
