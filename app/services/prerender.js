import Service from '@ember/service';

export default class PrerenderService extends Service {
  get isPrerendering() {
    return window.__isPrerendering;
  }
}
