import Ember from 'ember';

const {$} = Ember;

export default Ember.Service.extend({

  trackDynamicParams(transition) {
    const currentRouteParams = transition.router.state.params;
    const newParams = transition.state.params;

    const dynamicSlugLocation = 3;

    const currentThirdParamName = Object.keys(currentRouteParams)[dynamicSlugLocation];
    const newThirdParamName = Object.keys(newParams)[dynamicSlugLocation];

    this.set('currentThirdParam', currentRouteParams[currentThirdParamName]);
    this.set('newThirdParam', newParams[newThirdParamName]);
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
