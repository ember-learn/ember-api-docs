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

      let bootOptions = this.__container__.lookup('-environment:main');

      let router = get(this, 'router');

      let handleTransitionResolve = () => {
        if (!bootOptions.options.shouldRender) {
          // No rendering is needed, and routing has completed, simply return.
          return this;
        } else {
          return new RSVP.Promise((resolve) => {
            // Resolve once rendering is completed. `router.handleURL` returns the transition (as a thennable)
            // which resolves once the transition is completed, but the transition completion only queues up
            // a scheduled revalidation (into the `render` queue) in the Renderer.
            //
            // This uses `run.schedule('afterRender', ....)` to resolve after that rendering has completed.
            run.schedule('afterRender', null, resolve, this);
          });
        }
      };

      let handleTransitionReject = (error) => {
        if (error.error) {
          throw error.error;
        } else if (error.name === 'TransitionAborted' && router.router.activeTransition) {
          return router.router.activeTransition.then(handleTransitionResolve, handleTransitionReject);
        } else if (error.name === 'TransitionAborted') {
          throw new Error(error.message);
        } else {
          throw error;
        }
      };

      let location = get(router, 'location');

      // Keeps the location adapter's internal URL in-sync
      location.setURL(url);

      // getURL returns the set url with the rootURL stripped off
      return router.handleURL(location.getURL()).then(handleTransitionResolve, handleTransitionReject);
    }
  });
}
