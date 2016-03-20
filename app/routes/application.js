import Ember from 'ember';

const { set, inject } = Ember;

export default Ember.Route.extend({
  headData: inject.service(),
  title: function(tokens) {
    const reversed = Ember.makeArray(tokens).reverse();
    const title = `${reversed.join(' - ')} - Ember API Documentation`;
    set(this, 'headData.title', title);
    return title;
  }
});
