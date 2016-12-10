import Ember from 'ember';

const {$, inject} = Ember;

export default Ember.Mixin.create({

  routingService: inject.service('-routing'),

  _isChangingTab(transition) {
    const currentRouteParams = transition.router.state.params;
    const newParams = transition.state.params;

    const currentThirdParamName = Object.keys(currentRouteParams)[2];
    const newThirdParamName = Object.keys(newParams)[2];

    return currentRouteParams[currentThirdParamName] === newParams[newThirdParamName];
  },

  actions: {
    willTransition(transition) {
      if (!this._isChangingTab(transition)) {
        this.set('routingService._shouldResetScroll', true);
      }
    },
    didTransition() {
      if (this.get('routingService._shouldResetScroll')) {
        $('section.content').scrollTop(0);
        this.set('routingService._shouldResetScroll', false);
      }
    }
  }
});
