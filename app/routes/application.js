import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ENV from 'ember-api-docs/config/environment';

export default class ApplicationRoute extends Route {
  @service
  headData;

  @service
  legacyModuleMappings;

  @service
  router;

  @service
  fastboot;

  @service
  metrics;

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.router.on('routeDidChange', this.trackPage);
    }
  }

  trackPage = () => {
    // this is constant for this app and is only used to identify page views in the GA dashboard
    const hostname = ENV.APP.domain.replace(/(http|https)?:?\/\//g, '');

    const page = this.router.currentURL;
    const title = this.router.currentRouteName ?? 'unknown';
    this.metrics.trackPage({ page, title, hostname });
  };

  async afterModel() {
    set(this, 'headData.cdnDomain', ENV.API_HOST);
    await this.legacyModuleMappings.initMappings();
    return super.afterModel(...arguments);
  }
}
