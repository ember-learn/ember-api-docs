import Ember from 'ember';
import config from 'ember-api-docs/config/environment';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';


export default Ember.Service.extend({

  googleAnalytics: Ember.computed(async function() {
    await requestIdlePromise({timeout: 1000});
    await Ember.$.getScript('https://www.google-analytics.com/analytics.js');
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
