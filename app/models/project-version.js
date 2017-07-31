import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  version: DS.attr(),
  classes: DS.hasMany('class', {async: true}),
  packages: DS.hasMany('package', {async: true}),
  namespaces: DS.hasMany('namespace', {async: true}),
  'public-classes': DS.hasMany('class', {async: true}),
  'private-classes': DS.hasMany('class', {async: true}),
  'public-packages': DS.hasMany('package', {async: true}),
  'private-packages': DS.hasMany('package', {async: true}),
  'public-namespaces': DS.hasMany('namespace', {async: true}),
  'private-namespaces': DS.hasMany('namespace', {async: true}),
  project: DS.belongsTo('project'),
  compactVersion: Ember.computed('version', function() {
    return this.get('version').split('.').slice(0, 2).join('.');
  })
});
