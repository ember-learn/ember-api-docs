import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    const reversed = Ember.makeArray(tokens).reverse();
    return `${reversed.join(' - ')} - Ember API Documentation`;
  }
});
