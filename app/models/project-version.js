import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  version: DS.attr(),
  classes: DS.hasMany('class', {async: true}),
  publicClasses: DS.hasMany('class', {async: true}),
  privateClasses: DS.hasMany('class', {async: true}),
  project: DS.belongsTo('project')
});
