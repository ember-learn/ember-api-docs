import { computed } from '@ember/object';
import Model, { belongsTo, attr } from '@ember-data/model';

const projectNameFromClassName = (key) => {
  return computed(key, 'project.id', function () {
    const value = this.get(key) || '';
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
const guessVersionFor = (key) => {
  return computed(
    key,
    'extendedClassProjectName',
    'project.id',
    'projectVersion.version',
    function () {
      if (this.extendedClassProjectName === this.get('project.id')) {
        return this.get('projectVersion.version');
      }

      // try linking to latest version at least
      return 'release';
    }
  );
};

export default class Class extends Model {
  @attr()
  name;

  @attr()
  methods;

  @attr()
  properties;

  @attr()
  access;

  @attr()
  events;

  @attr()
  description;

  @attr()
  ogDescription;

  @attr()
  extends;

  @attr()
  uses;

  @attr()
  since;

  @attr()
  file;

  @attr()
  line;

  @attr()
  module;

  @belongsTo('class', { async: true, inverse: null })
  parentClass;

  @belongsTo('project-version', { inverse: 'classes' })
  projectVersion;

  @computed('projectVersion.id')
  get project() {
    return this.projectVersion.get('project');
  }

  @projectNameFromClassName('extends')
  extendedClassProjectName;

  @guessVersionFor('extends')
  extendedClassVersion;

  @projectNameFromClassName('uses')
  usedClassProjectName;

  @guessVersionFor('uses')
  usedClassVersion;

  @computed('extends')
  get extendedClassShortName() {
    let extendedClassName = this['extends'];
    if (extendedClassName.substr(0, 6) === 'Ember.') {
      return extendedClassName.substr(6);
    }
    return extendedClassName;
  }

  @computed('project.id', 'uses')
  get usesObjects() {
    return this.uses.map((className) => ({
      name: className,
      shortName:
        className.substr(0, 6) === 'Ember.' ? className.substr(6) : className,
      projectId:
        className.substr(0, 6) === 'Ember.'
          ? 'ember'
          : className.substr(0, 3) === 'DS'
          ? 'ember-data'
          : this.get('project.id'),
    }));
  }
}
