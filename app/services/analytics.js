import Ember from 'ember';
import config from 'ember-api-docs/config/environment';
import { requestIdlePromise } from 'ember-api-docs/utils/request-idle-callback';

const { computed, $ } = Ember;

export default Ember.Service.extend({

  googleAnalytics: computed(function() {
    return requestIdlePromise({timeout: 1000}).then(() => {
      return $.getScript('https://www.google-analytics.com/analytics.js');
    }).then(() => {
      window.ga('create', config.gaTrackingId, 'auto');
    });
  }),

  trackPage(page, title) {
    return this.get('googleAnalytics').then(() => {
      return requestIdlePromise({timeout: 1000});
    }).then(() => {
      window.ga('send', {
        hitType: 'pageview',
        page,
        title
      });
    });
  }
});
