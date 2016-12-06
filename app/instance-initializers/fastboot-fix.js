import Ember from 'ember';

const {get, RSVP, run} = Ember;

export default {
    name: 'fastboot-fix',
    initialize: function(instance) {
        fixNoneLocation(Ember.NoneLocation);
        fixApplicationInstance(instance);
    }
};

//Add support for rootURL to NoneLocation
function fixNoneLocation(NoneLocation) {
  NoneLocation.reopen({
    rootURL: '/',

    //Override formatURL to prepend the rootURL so {{link-to}}s work as expected
    formatURL(url) {
      var rootURL = get(this, 'rootURL');
      if (url !== '') {
        // remove trailing slashes if they exists
        rootURL = rootURL.replace(/\/$/, '');
      }
      return rootURL + url;
    }
  });
}

//Monkey-patch ApplicationInstance's `visit` method
function fixApplicationInstance(ApplicationInstance) {
  ApplicationInstance.reopen({
    visit(url) {
      this.setupRouter();

      let router = get(this, 'router');

      let handleResolve = () => {
        // Resolve only after rendering is complete
        return new RSVP.Promise((resolve) => {
          // TODO: why is this necessary? Shouldn't 'actions' queue be enough?
          // Also, aren't proimses supposed to be async anyway?
          run.next(null, resolve, this);
        });
      };

      let handleReject = (error) => {
        if (error.error) {
          throw error.error;
        } else if (error.name === 'TransitionAborted' && router.router.activeTransition) {
          return router.router.activeTransition.then(handleResolve, handleReject);
        } else if (error.name === 'TransitionAborted') {
          console.log('TransitionAborted');
          throw error;
        } else {
          throw error;
        }
      };

      //<money-patch>
      let location = get(router, 'location');
      let rootURL = get(location, 'rootURL');
      rootURL = rootURL.replace(/\/$/, '');
      url = url.replace(rootURL, '');
      location.setURL(url);
      //</money-patch>

      return router.handleURL(url).then(handleResolve, handleReject);
    }
  });
}
