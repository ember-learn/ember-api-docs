import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  // Public API
  result: {},
  role: 'option',
  groupName: '',
  groupPosition: 0, // Index of this result in the grouped results

  // Private API
  classNames: ['ds-suggestion'],
  attributeBindings: ['role'],
  url: computed('result.{project,class,module,name}', function() {
    const project = this.get('result.project') || 'ember';
    const versionTag = this.get('result._tags').find(_tag => _tag.indexOf('version:') > -1);
    const versionSegments = versionTag.replace('version:', '').split('.');
    const methodClass = this.get('result.class');
    const methodName = this.get('result.name');

    return `/${project}/${versionSegments[0]}.${versionSegments[1]}/classes/${methodClass}?anchor=${methodName}`;
  }),
  // Left sidebar should only be displayed for the first result in the group
  _primaryColumn: computed('groupPosition,groupName', function () {
    const { groupName, groupPosition } = this.getProperties('groupName', 'groupPosition');
    return groupPosition === 0? groupName : '';
  }),
  isSecondary: gt('groupPosition', 0)
});
