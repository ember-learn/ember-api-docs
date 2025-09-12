import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ENV from 'ember-api-docs/config/environment';
import { isDestroying, isDestroyed } from '@ember/destroyable';

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

  @service
  routerScroll;

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.router.on('routeDidChange', this.trackPage);

      /* Hax from https://github.com/DockYard/ember-router-scroll/issues/263 
         to handle router scroll behavior when the page was initially served 
         with fastboot
       */
      this.routerScroll.set('preserveScrollPosition', true);

      setTimeout(() => {
        if (!isDestroying(this) && !isDestroyed(this)) {
          this.routerScroll.set('preserveScrollPosition', false);
        }
      }, 1000);
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
