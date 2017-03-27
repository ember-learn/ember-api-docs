import Ember from 'ember';

const { RSVP, run } = Ember;

function requestIdleCb(cb, opts) {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(cb, opts);
  } else {
    return run.scheduleOnce('afterRender', cb);
  }
}

export function requestIdlePromise({timeout}) {
  return new RSVP.Promise(resolve => {
    requestIdleCb(resolve, {timeout});
  });
}
