import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import getCompactVersion from '../utils/get-compact-version';

export default Model.extend({
  version: attr(),
  classes: hasMany('class', {async: true}),
  modules: hasMany('module', {async: true}),
  namespaces: hasMany('namespace', {async: true}),
  'public-classes': hasMany('class', {async: true}),
  'private-classes': hasMany('class', {async: true}),
  'public-modules': hasMany('module', {async: true}),
  'private-modules': hasMany('module', {async: true}),
  'public-namespaces': hasMany('namespace', {async: true}),
  'private-namespaces': hasMany('namespace', {async: true}),
  project: belongsTo('project'),
  compactVersion: computed('version', function() {
    return getCompactVersion(this.version);
  })
});
