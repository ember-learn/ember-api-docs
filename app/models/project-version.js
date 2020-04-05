import { computed } from '@ember/object';
import DS from 'ember-data';
import getCompactVersion from '../utils/get-compact-version';

export default DS.Model.extend({
  version: DS.attr(),
  revMap: DS.attr(),
  classes: DS.hasMany('class', { async: true }),
  modules: DS.hasMany('module', { async: true }),
  namespaces: DS.hasMany('namespace', { async: true }),
  'public-classes': DS.hasMany('class', { async: true }),
  'private-classes': DS.hasMany('class', { async: true }),
  'public-modules': DS.hasMany('module', { async: true }),
  'private-modules': DS.hasMany('module', { async: true }),
  'public-namespaces': DS.hasMany('namespace', { async: true }),
  'private-namespaces': DS.hasMany('namespace', { async: true }),
  project: DS.belongsTo('project'),
  compactVersion: computed('version', function () {
    return getCompactVersion(this.version);
  }),

  firstModule: computed('modules.[]', function () {
    let moduleNames = Object.keys(this.revMap.module).sort();
    let encodedModule = moduleNames[0]
      .split('-')
      .reduce((result, val, index, arry) =>
        val === this.version ? arry.slice(index + 1).join('-') : result
      );
    return decodeURIComponent(encodedModule);
  }),
});
