import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  version: DS.attr(),
  classes: DS.hasMany('class', {async: true})
});
