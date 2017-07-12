import Ember from 'ember';


export default Ember.Mixin.create({

  scrollPositionReset: Ember.inject.service(),

  actions: {
    willTransition(transition) {
      this.get('scrollPositionReset').scheduleReset(transition);
    },

    didTransition() {
      this.get('scrollPositionReset').doReset();
    }
  }
});
