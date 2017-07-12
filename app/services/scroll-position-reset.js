import Ember from 'ember';
import config from 'ember-api-docs/config/environment';

const { scrollContainerElement } = config.APP;

export default Ember.Service.extend({

  _isChangingTab(transition) {
    const currentRouteParams = transition.router.state.params;
    const newParams = transition.state.params;

    const dynamicSlugLocation = 3;

    const currentThirdParamName = Object.keys(currentRouteParams)[dynamicSlugLocation];
    const newThirdParamName = Object.keys(newParams)[dynamicSlugLocation];

    return currentRouteParams[currentThirdParamName] === newParams[newThirdParamName];
  },

  scheduleReset(transition) {
    if (!this._isChangingTab(transition)) {
      this.set('_shouldResetScroll', true);
    }
  },

  doReset() {
    if (this.get('_shouldResetScroll')) {
      Ember.$(scrollContainerElement).scrollTop(0);
      this.set('_shouldResetScroll', false);
    }
  }


});
