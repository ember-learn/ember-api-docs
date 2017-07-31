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

  // Left sidebar should only be displayed for the first result in the group
  _primaryColumn: computed('groupPosition,groupName', function () {
    const { groupName, groupPosition } = this.getProperties('groupName', 'groupPosition');
    return groupPosition === 0? groupName : '';
  }),
  isSecondary: gt('groupPosition', 0)
});
