import Model, { belongsTo, attr } from '@ember-data/model';

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

  get project() {
    return this.projectVersion.get('project');
  }

  get extendedClassProjectName() {
    return this.projectNameFromClassName(this['extends']);
  }

  get usedClassProjectName() {
    return this.projectNameFromClassName(this.uses);
  }

  get extendedClassShortName() {
    let extendedClassName = this['extends'];
    if (extendedClassName.substr(0, 6) === 'Ember.') {
      return extendedClassName.substr(6);
    }
    return extendedClassName;
  }

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
            : this.project.id,
    }));
  }

  projectNameFromClassName(val) {
    const value = val ?? '';
    if (value.indexOf('Ember.') > -1) {
      return 'ember';
    }

    if (value.indexOf('DS.') > 1) {
      return 'ember-data';
    }

    return this.project.id;
  }
}
