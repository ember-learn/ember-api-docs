import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

const projectNameFromClassName = key => {
  return computed(key, function() {
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
  return computed(key, 'project.id', function() {

    if (this.extendedClassProjectName === this.get('project.id')) {
      return this.get('projectVersion.version');
    }

    // try linking to latest version at least
    return 'release';
  });
};

export default Model.extend({
  name: attr(),
  methods: attr(),
  properties: attr(),
  access: attr(),
  events: attr(),
  description: attr(),
  ogDescription: attr(),
  extends: attr(),
  uses: attr(),
  since: attr(),
  file: attr(),
  line: attr(),
  module: attr(),
  parentClass: belongsTo('class', {async: true, inverse: null}),
  projectVersion: belongsTo('project-version', {inverse: 'classes'}),
  project: computed('projectVersion.id', function() {
    return this.projectVersion.get('project');
  }),

  extendedClassProjectName: projectNameFromClassName('extends'),
  extendedClassVersion: guessVersionFor('extends'),
  usedClassProjectName: projectNameFromClassName('uses'),
  usedClassVersion: guessVersionFor('uses'),

  extendedClassShortName: computed('extends', function() {
    let extendedClassName = this['extends'];
    if (extendedClassName.substr(0, 6) === 'Ember.') {
      return extendedClassName.substr(6);
    }
    return extendedClassName;
  }),

  usesObjects: computed('uses', function() {
    return this.uses.map(className => ({
      name: className,
      shortName: className.substr(0, 6) === 'Ember.' ? className.substr(6) : className,
      projectId: className.substr(0, 6) === 'Ember.' ? 'ember' :
        className.substr(0, 3) === 'DS' ? 'ember-data' : this.get('project.id')
    }));
  })

});
