import Service from '@ember/service';
import config from '../config/environment';
import getOffset from '../utils/get-offset';

const { scrollContainerSelector } = config.APP;

export default class ScrollPositionResetService extends Service {
  constructor() {
    super(...arguments);
    this._shouldResetScroll = false;
  }
  handleScrollPosition() {
    if (
      typeof FastBoot === 'undefined' &&
      window.location.search === '?anchor='
    ) {
      let elem = document.querySelector('#methods');

      if (elem && elem.offsetHeight) {
        const offsetToScroll = getOffset(
          elem,
          config.APP.scrollContainerSelector
        );
        document
          .querySelector(config.APP.scrollContainerSelector)
          .scrollTo(0, offsetToScroll - 10);
        return;
      }
    }
    this.doReset();
  }

  _isChangingTab(transition) {
    //TODO: Use routeInfo for reliable behavior
    const dynamicSlugLocation = 3;

    // These will be unset when first entering the app, in which case we know we
    // are not changing tabs.
    if (!transition.from || !transition.to) {
      return false;
    }

    let fromRoutePathParts = transition.from.name.split('.');
    let toRoutePathParts = transition.to.name.split('.');

    let fromSubPath = fromRoutePathParts
      .splice(dynamicSlugLocation, fromRoutePathParts.length)
      .join('.');
    let toSubPath = toRoutePathParts
      .splice(dynamicSlugLocation, toRoutePathParts.length)
      .join('.');

    return (
      fromSubPath !== toSubPath &&
      fromRoutePathParts.join('.') === toRoutePathParts.join('.')
    );
  }

  scheduleReset(transition) {
    if (!this._isChangingTab(transition)) {
      this._shouldResetScroll = true;
    }
  }

  doReset() {
    // No-op if we get called in FastBoot, since doing the `document` operations
    // is by definition unsafe in that mode!
    if (typeof FastBoot !== 'undefined') {
      return;
    }

    if (this._shouldResetScroll) {
      const selector = document.querySelector(scrollContainerSelector);
      if (selector.scrollTo) {
        selector.scrollTo(0, 0);
      } else {
        // fallback for IE11
        selector.scrollLeft = 0;
        selector.scrollTop = 0;
      }
      this._shouldResetScroll = false;
    }
  }
}
