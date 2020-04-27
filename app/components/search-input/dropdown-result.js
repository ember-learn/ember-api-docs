import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  // Public API
  result: Object.freeze({}),
  role: 'option',
  groupName: '',
  groupPosition: 0, // Index of this result in the grouped results

  module: computed('result.{project,module}', function () {
    if (this.get('result.project')) {
      return this.get('result.project');
    }
    let module = this.get('result.module');
    if (module.includes('ember-data')) {
      return 'ember-data';
    }
    return 'ember';
  }),
  // Private API
  classNames: ['ds-suggestion'],
  attributeBindings: ['role'],
  version: computed('result._tags.[]', function () {
    let versionTag = this.get('result._tags').find(_tag => _tag.indexOf('version:') > -1);
    let versionSegments = versionTag.replace('version:', '').split('.');
    return `${versionSegments[0]}.${versionSegments[1]}`;
  }),
  // Left sidebar should only be displayed for the first result in the group
  _primaryColumn: computed('groupPosition,groupName', function () {
    const { groupName, groupPosition } = this;
    return groupPosition === 0? groupName : '';
  }),
  isSecondary: gt('groupPosition', 0)


});
