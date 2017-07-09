import Ember from 'ember';

const {$, inject} = Ember;

const DYNAMIC_SLUG_LOCATION = 3;

export default Ember.Service.extend({

  router: inject.service(),

  init() {
    this._super(...arguments);
    const newParams = this.get('router._router.targetState.routerJsState.params');
    this._setDynamicParams(newParams);
  },

  trackDynamicParams(transition) {
    const newParams = transition.state.params;
    const currentRouteParams = transition.router.state.params;

    this._setDynamicParams(newParams, currentRouteParams);
  },

  _setDynamicParams(newParams, currentRouteParams) {

    if (newParams) {
      const newThirdParamName = Object.keys(newParams)[DYNAMIC_SLUG_LOCATION];
      this.set('newThirdParam', newParams[newThirdParamName]);
    }

    if (currentRouteParams) {
      const currentThirdParamName = Object.keys(currentRouteParams)[DYNAMIC_SLUG_LOCATION];
      this.set('currentThirdParam', currentRouteParams[currentThirdParamName]);
    }

  },

  _isChangingTab(transition) {
    return this.get('currentThirdParam')  === this.get('newThirdParam');
  },

  scheduleScrollReset(transition) {
    if (!this._isChangingTab()) {
      this.set('_shouldResetScroll', true);
    }
  },

  doReset() {
    if (this.get('_shouldResetScroll')) {
      $('section.content').scrollTop(0);
      this.set('_shouldResetScroll', false);
    }
  }


});
