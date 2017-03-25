import Ember from 'ember';
import ENV from 'ember-api-docs/config/environment';


const { inject: { service } } = Ember;

export default Ember.Route.extend({

  fastboot: service(),

  beforeModel() {
    let fastboot = this.get('fastboot');

    // This app doesn't get its own custom domain since its part of emberjs.com site
    // under the `/api/` path. Since there's no custom domain or ssl keys to
    // setup, we're convincing the fastboot server into believing we're serving over ssl.
    if (fastboot.get('isFastBoot') && ENV.environment === 'production') {
      let request = fastboot.get('request');
      request.protocol = 'https';
      fastboot.set('request', request);
    }

    return this.transitionTo('project', 'ember');
  }
});
