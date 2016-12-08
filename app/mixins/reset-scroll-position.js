import Ember from 'ember';

const {$} = Ember;

export default Ember.Mixin.create({

  _hasSameThirdParam(transition) {
    const currentRouteParams = transition.router.state.params;
    const newParams = transition.state.params;

    const currentThirdParamName = Object.keys(currentRouteParams)[2];
    const newThirdParamName = Object.keys(newParams)[2];

    return currentRouteParams[currentThirdParamName] === newParams[newThirdParamName];
  },

  actions: {
    willTransition(transition) {
      if (!this._hasSameThirdParam(transition)) {
        $('main > article').scrollTop(0);
      }
    }
  }
});
