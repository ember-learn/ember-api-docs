import Ember from 'ember';

const { RSVP, run } = Ember;

export function requestIdleCb(cb, opts) {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(cb, opts);
  } else {
    return run.shceduleOnce('afterRender', cb);
  }
}

export function requestIdlePromise({timeout}) {
  return new RSVP.Promise(resolve => {
    requestIdleCb(resolve, {timeout});
  });
}
