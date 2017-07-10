import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  currentYear: Ember.computed(function() {
    return new Date().getUTCFullYear();
  })

});
