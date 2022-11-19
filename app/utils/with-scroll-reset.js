import { inject as service } from '@ember/service';
import config from 'ember-api-docs/config/environment';
import getOffset from 'ember-api-docs/utils/get-offset';

/**
 * Add scroll reset behavior to a `Route`.
 *
 * @param {import('@ember/routing/route').default} SomeRoute A Route class to
 *   decorate with the scroll position handling.
 * @returns the decorated class
 */
export function withScrollReset(SomeRoute) {
  class WithScrollReset extends SomeRoute {
    /** @type {import('@ember/routing/router-service').default} */
    @service
    router;

    /** @type {import('../services/scroll-position-reset').default} */
    @service
    scrollPositionReset;

    constructor() {
      super(...arguments);
      this.router.on('routeWillChange', (transition) =>
        this.scrollPositionReset.scheduleReset(transition)
      );

      this.router.on('routeDidChange', () => {
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
            const scrollContainer = document.querySelector(
              config.APP.scrollContainerSelector
            );
            if (scrollContainer.scrollTo) {
              scrollContainer.scrollTo(0, offsetToScroll - 10);
            } else {
              // fallback for IE11
              scrollContainer.scrollTop = offsetToScroll - 10;
            }
            return;
          }
        }
        this.scrollPositionReset.doReset();
      });
    }
  }

  return WithScrollReset;
}
