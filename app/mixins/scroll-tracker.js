import Mixin from '@ember/object/mixin';
import Ember from 'ember';

const {
  inject
} = Ember;

export default Mixin.create({

  scrollPositionReset: inject.service(),

  actions: {
    willTransition(transition) {
      this.get('scrollPositionReset').scheduleReset(transition);
    },

    didTransition() {
      this.get('scrollPositionReset').doReset();
    }
  }
});
