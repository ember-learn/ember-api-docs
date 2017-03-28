import Ember from 'ember';

export default Ember.Component.extend({
  // Public API
  result: {},
  role: 'option',
  groupName: '',
  groupPosition: 0, // Index of this result in the grouped results

  // Private API
  classNames: ['ds-suggestion'],
  attributeBindings: ['role'],

  // Left sidebar should only be displayed for the first result in the group
  _primaryColumn: Ember.computed('groupPosition,groupName', function () {
    const { groupName, groupPosition } = this.getProperties('groupName', 'groupPosition');
    return groupPosition === 0? groupName : '';
  }),
  isSecondary: Ember.computed.gt('groupPosition', 0)
});
