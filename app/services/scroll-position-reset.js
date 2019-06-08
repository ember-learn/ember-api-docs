import Service from '@ember/service';
import config from 'ember-api-docs/config/environment';

const { scrollContainerSelector } = config.APP;


export default Service.extend({

  _isChangingTab(transition) {
    const dynamicSlugLocation = 3;

    let fromRoutePathParts = transition.from.name.split('.');
    let toRoutePathParts = transition.to.name.split('.');

    let fromSubPath = fromRoutePathParts.splice(dynamicSlugLocation, fromRoutePathParts.length).join('.');
    let toSubPath = toRoutePathParts.splice(dynamicSlugLocation, toRoutePathParts.length).join('.');

    return fromSubPath !==toSubPath &&
      fromRoutePathParts.join('.') === toRoutePathParts.join('.')
  },

  scheduleReset(transition) {
    if (!this._isChangingTab(transition)) {
      this.set('_shouldResetScroll', true);
    }
  },

  doReset() {
    if (this._shouldResetScroll) {
      const selector = document.querySelector(scrollContainerSelector);
      selector.scrollTo(0,0);
      this.set('_shouldResetScroll', false);
    }
  }


});
