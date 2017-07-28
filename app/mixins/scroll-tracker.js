import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({

  scrollPositionReset: service(),

  actions: {
    willTransition(transition) {
      this.get('scrollPositionReset').scheduleReset(transition);
    },

    didTransition() {
      this.get('scrollPositionReset').doReset();
    }
  }
});
