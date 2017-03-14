import Ember from 'ember';

export default Ember.Service.extend({
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,
  sideNav: {
    showPrivate: false
  }
});
