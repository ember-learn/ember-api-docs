import Ember from 'ember';


function requestIdleCb(cb, opts) {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(cb, opts);
  } else {
    return Ember.run.scheduleOnce('afterRender', cb);
  }
}

export function requestIdlePromise({timeout}) {
  return new Ember.RSVP.Promise(resolve => {
    requestIdleCb(resolve, {timeout});
  });
}
