import Service from '@ember/service';
import config from '../config/environment';
import getOffset from '../utils/get-offset';

const { scrollContainerSelector } = config.APP;

export default class ScrollPositionResetService extends Service {
  handleScrollPosition() {
    if (typeof FastBoot === 'undefined' && window.location.search === '?anchor=') {
      let elem = document.querySelector('#methods');

      if (elem && elem.offsetHeight) {
        const offsetToScroll = getOffset(elem, config.APP.scrollContainerSelector);
        document.querySelector(config.APP.scrollContainerSelector).scrollTo(0, offsetToScroll - 10);
        return;
      }
    }
    this.doReset();
  }

  _isChangingTab(transition) {
    //TODO: Use routeInfo for reliable behavior
    const dynamicSlugLocation = 3;

    let fromRoutePathParts = transition.from.name.split('.');
    let toRoutePathParts = transition.to.name.split('.');

    let fromSubPath = fromRoutePathParts
      .splice(dynamicSlugLocation, fromRoutePathParts.length)
      .join('.');
    let toSubPath = toRoutePathParts.splice(dynamicSlugLocation, toRoutePathParts.length).join('.');

    return fromSubPath !== toSubPath && fromRoutePathParts.join('.') === toRoutePathParts.join('.');
  }

  scheduleReset(transition) {
    if (!this._isChangingTab(transition)) {
      this._shouldResetScroll = true;
    }
  }

  doReset() {
    if (this._shouldResetScroll) {
      const selector = document.querySelector(scrollContainerSelector);
      if (selector.scrollTo) {
        selector.scrollTo(0,0);
      } else {
        // fallback for IE11
        selector.scrollLeft = 0;
        selector.scrollTop = 0;
      }
      this.set('_shouldResetScroll', false);
    }
  }
}
