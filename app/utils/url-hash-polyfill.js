import { getOwner } from '@ember/owner';
import { warn } from '@ember/debug';
import {
  isDestroyed,
  isDestroying,
  registerDestructor,
} from '@ember/destroyable';
import { schedule } from '@ember/runloop';
import { waitForPromise } from '@ember/test-waiters';

/* Taken from ember-url-hash-polyfill (https://github.com/CrowdStrike/ember-url-hash-polyfill/)
   and modified to not run in Fastboot. The original addon is not maintained. 
   There is a PR to add it to ember-primitives https://github.com/universal-ember/ember-primitives/pull/529
*/

export function withHashSupport(AppRouter) {
  return class RouterWithHashSupport extends AppRouter {
    constructor(...args) {
      super(...args);

      setupHashSupport(this);
    }
  };
}

export function scrollToHash(hash) {
  let selector = `[name="${hash}"]`;
  let element =
    document.getElementById(hash) || document.querySelector(selector);

  if (!element) {
    warn(
      `Tried to scroll to element with id or name "${hash}", but it was not found`,
      {
        id: 'no-hash-target',
      },
    );

    return;
  }

  /**
   * NOTE: the ember router does not support hashes in the URL
   *       https://github.com/emberjs/rfcs/issues/709
   *
   *       this means that when testing hash changes in the URL,
   *       we have to assert against the window.location, rather than
   *       the self-container currentURL helper
   *
   * NOTE: other ways of changing the URL, but without the smoothness:
   *   - window[.top].location.replace
   */

  element.scrollIntoView({ behavior: 'smooth' });

  if (hash !== window.location.hash) {
    let withoutHash = location.href.split('#')[0];
    let nextUrl = `${withoutHash}#${hash}`;
    // most browsers ignore the title param of pushState
    let titleWithoutHash = document.title.split(' | #')[0];
    let nextTitle = `${titleWithoutHash} | #${hash}`;

    history.pushState({}, nextTitle, nextUrl);
    document.title = nextTitle;
  }
}

function isLoadingRoute(routeName) {
  return routeName.endsWith('_loading') || routeName.endsWith('.loading');
}

async function setupHashSupport(router) {
  let initialURL;
  let owner = getOwner(router);

  if (owner.lookup('service:fastboot').isFastBoot) {
    return;
  }

  await new Promise((resolve) => {
    let interval = setInterval(() => {
      let { currentURL, currentRouteName } = router; /* Private API */

      if (currentURL && !isLoadingRoute(currentRouteName)) {
        clearInterval(interval);
        initialURL = currentURL;
        resolve(null);
      }
    }, 100);
  });

  if (isDestroyed(owner) || isDestroying(owner)) {
    return;
  }

  /**
   * This handles the initial Page Load, which is not imperceptible through
   * route{Did,Will}Change
   *
   */
  requestAnimationFrame(() => {
    eventuallyTryScrollingTo(owner, initialURL);
  });

  let routerService = owner.lookup('service:router');

  function handleHashIntent(transition) {
    let { url } = transition.intent || {};

    if (!url) {
      return;
    }

    eventuallyTryScrollingTo(owner, url);
  }

  routerService.on('routeDidChange', handleHashIntent);

  registerDestructor(router, () => {
    routerService.off('routeDidChange', handleHashIntent);
  });
}

const CACHE = new WeakMap();

async function eventuallyTryScrollingTo(owner, url) {
  // Prevent quick / rapid transitions from continuing to observer beyond their URL-scope
  CACHE.get(owner)?.disconnect();

  if (!url) return;

  let [, hash] = url.split('#');

  if (!hash) return;

  await waitForPromise(uiSettled(owner));

  if (isDestroyed(owner) || isDestroying(owner)) {
    return;
  }

  scrollToHash(hash);
}

const TIME_SINCE_LAST_MUTATION = 500; // ms
const MAX_TIMEOUT = 2000; // ms

// exported for testing
async function uiSettled(owner) {
  let timeStarted = new Date().getTime();
  let lastMutationAt = Infinity;
  let totalTimeWaited = 0;

  let observer = new MutationObserver(() => {
    lastMutationAt = new Date().getTime();
  });

  CACHE.set(owner, observer);

  observer.observe(document.body, { childList: true, subtree: true });

  /**
   * Wait for DOM mutations to stop until MAX_TIMEOUT
   */
  await new Promise((resolve) => {
    let frame;

    function requestTimeCheck() {
      if (frame) cancelAnimationFrame(frame);

      if (isDestroyed(owner) || isDestroying(owner)) {
        return;
      }

      frame = requestAnimationFrame(() => {
        totalTimeWaited = new Date().getTime() - timeStarted;

        let timeSinceLastMutation = new Date().getTime() - lastMutationAt;

        if (totalTimeWaited >= MAX_TIMEOUT) {
          return resolve(totalTimeWaited);
        }

        if (timeSinceLastMutation >= TIME_SINCE_LAST_MUTATION) {
          return resolve(totalTimeWaited);
        }

        // eslint-disable-next-line ember/no-runloop
        schedule('afterRender', requestTimeCheck);
      });
    }

    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', requestTimeCheck);
  });
}
