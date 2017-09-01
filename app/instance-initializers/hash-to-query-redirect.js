import hashToQuery from 'hash-to-query';

export function initialize(application) {
  if (typeof FastBoot === 'undefined') {
    window.onhashchange = function() {
      let router = application.lookup('service:router');
      let redirectToUrl = hashToQuery(window.location.hash, window.location.pathname);
      if (redirectToUrl) {
        router.transitionTo(redirectToUrl);
      }
    }
  }
}

export default {
  name: 'hash-to-query-redirect',
  initialize
};
