import Ember from 'ember';
import config from 'ember-api-docs/config/environment';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';

const { computed, $ } = Ember;

export default Ember.Service.extend({

  googleAnalytics: computed(async function() {
    await requestIdlePromise({timeout: 1000});
    await $.getScript('https://www.google-analytics.com/analytics.js');
    window.ga('create', config.gaTrackingId, 'auto');
  }),

  async trackPage(page, title) {
    if (config.environment === 'development') {
      return;
    }

    await this.get('googleAnalytics');
    await requestIdlePromise({timeout: 1000});

    window.ga('send', {
      hitType: 'pageview',
      page,
      title
    });
  }
});
