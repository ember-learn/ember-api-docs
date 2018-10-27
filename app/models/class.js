import { computed } from '@ember/object';
import DS from 'ember-data';
const {attr, belongsTo} = DS;

const projectNameFromClassName = key => {
  return computed(key, function() {
    const value = this.get(key) || "";
    if (value.indexOf('Ember.') > -1) {
      return 'ember';
    }

    if (value.indexOf('DS.') > -1) {
      return 'ember-data';
    }

    return this.get('project.id');
  });
};

// ideally this computed property would not be needed and we'd have extendsVersion, extendsProject attrs from json-api-docs
const guessVersionFor = key => {
  return computed(key, 'project.id', function() {

    if (this.get('extendedClassProjectName') === this.get('project.id')) {
      return this.get('projectVersion.version');
    }

    // try linking to latest version at least
    return 'release';
  });
};

export default DS.Model.extend({
  name: attr(),
  methods: attr(),
  properties: attr(),
  access: attr(),
  events: attr(),
  description: attr(),
  ogDescription: attr(),
  extends: attr(),
  uses: attr(),
  file: attr(),
  line: attr(),
  module: attr(),
  parentClass: belongsTo('class', {async: true, inverse: null}),
  projectVersion: belongsTo('project-version', {inverse: 'classes'}),
  project: computed('projectVersion.id', function() {
    return this.get('projectVersion').get('project');
  }),

  extendedClassProjectName: projectNameFromClassName('extends'),
  extendedClassVersion: guessVersionFor('extends'),
  usedClassVersion: guessVersionFor('uses')

});
