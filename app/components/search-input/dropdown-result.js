import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set("result", {});
  },
  // Public API
  result: null,
  role: 'option',
  groupName: '',
  groupPosition: 0, // Index of this result in the grouped results

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
    const { groupName, groupPosition } = this.getProperties('groupName', 'groupPosition');
    return groupPosition === 0? groupName : '';
  }),
  isSecondary: gt('groupPosition', 0)
});
