import Service, { service } from '@ember/service';

export default class PrerenderService extends Service {
  @service fastboot;

  get isPrerendering() {
    return this.fastboot.isFastBoot;
  }
}
