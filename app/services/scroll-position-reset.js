import Ember from 'ember';

const {$} = Ember;

export default Ember.Service.extend({

  _isChangingTab(transition) {
    const currentRouteParams = transition.router.state.params;
    const newParams = transition.state.params;

    const currentThirdParamName = Object.keys(currentRouteParams)[2];
    const newThirdParamName = Object.keys(newParams)[2];

    return currentRouteParams[currentThirdParamName] === newParams[newThirdParamName];
  },

  scheduleReset(transition) {
    if (!this._isChangingTab(transition)) {
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
