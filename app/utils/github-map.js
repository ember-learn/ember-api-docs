import semverCompare from 'semver-compare';

export const mainDir = function(project, version) {
  if (project === 'ember') {
    return '/';
  }
  if (project === 'ember-data') {
    if (semverCompare(version, '3.11') === -1) {
      return '/';
    }
    return '/packages/-ember-data/';
  }
};

export default {
  'ember': 'emberjs/ember.js',
  'ember-data': 'emberjs/data'
};
