import DS from 'ember-data';
import Ember from 'ember';


const projectNameFromClassName = key => {
  return Ember.computed(key, function() {
    const value = this.get(key) || "";
    if (value.indexOf('Ember.') > -1) {
      return 'ember';
    }

    if (value.indexOf('DS.') > 1) {
      return 'ember-data';
    }

    return this.get('project.id');
  });
};

// ideally this computed property would not be needed and we'd have extendsVersion, extendsProject attrs from json-api-docs
const guessVersionFor = key => {
  return Ember.computed(key, 'project.id', function() {

    if (this.get('extendedClassProjectName') === this.get('project.id')) {
      return this.get('projectVersion.version');
    }

    // try linking to latest version at least
    return 'release';
  });
};

export default DS.Model.extend({
  name: DS.attr(),
  methods: DS.attr(),
  properties: DS.attr(),
  access: DS.attr(),
  events: DS.attr(),
  description: DS.attr(),
  ogDescription: DS.attr(),
  extends: DS.attr(),
  uses: DS.attr(),
  file: DS.attr(),
  line: DS.attr(),
  module: DS.attr(),
  parentClass: DS.belongsTo('class', {async: true, inverse: null}),
  projectVersion: DS.belongsTo('project-version', {inverse: 'classes'}),
  project: Ember.computed('projectVersion.id', function() {
    return this.get('projectVersion').get('project');
  }),

  extendedClassProjectName: projectNameFromClassName('extends'),
  extendedClassVersion: guessVersionFor('extends'),
  usedClassProjectName: projectNameFromClassName('uses'),
  usedClassVersion: guessVersionFor('uses')

});
