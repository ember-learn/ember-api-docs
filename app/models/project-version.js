import { computed } from '@ember/object';
import DS from 'ember-data';
import getCompactVersion from '../utils/get-compact-version';

export default DS.Model.extend({
  version: DS.attr(),
  classes: DS.hasMany('class', {async: true}),
  modules: DS.hasMany('module', {async: true}),
  namespaces: DS.hasMany('namespace', {async: true}),
  'public-classes': DS.hasMany('class', {async: true}),
  'private-classes': DS.hasMany('class', {async: true}),
  'public-modules': DS.hasMany('module', {async: true}),
  'private-modules': DS.hasMany('module', {async: true}),
  'public-namespaces': DS.hasMany('namespace', {async: true}),
  'private-namespaces': DS.hasMany('namespace', {async: true}),
  project: DS.belongsTo('project'),
  compactVersion: computed('version', function() {
    return getCompactVersion(this.get('version'));
  })
});
