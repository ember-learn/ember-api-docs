import Ember from 'ember';

const { inject, Mixin } = Ember;

export default Mixin.create({

  transitionService: inject.service('transition'),

  actions: {
    willTransition(transition) {
      this.get('transitionService').trackDynamicParams(transition);
      this.get('transitionService').scheduleScrollReset(transition);
    },

    didTransition() {
      this.get('transitionService').doReset();
    }
  }
});
