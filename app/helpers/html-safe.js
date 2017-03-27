import Ember from 'ember';

export function htmlSafe([content]) {
  return Ember.String.htmlSafe(content);
}

export default Ember.Helper.helper(htmlSafe);
