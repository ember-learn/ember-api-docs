import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import config from 'ember-api-docs/config/environment';
import getOffset from 'ember-api-docs/utils/get-offset';

export default Mixin.create({

  scrollPositionReset: service(),

  actions: {
    willTransition(transition) {
      this.scrollPositionReset.scheduleReset(transition);
    },

    didTransition() {
      this._super();
      if ((typeof FastBoot === 'undefined') && window.location.search === '?anchor=' ) {
        let elem = document.querySelector('#methods');
        let offsetTop = elem.offsetHeight;

        if (offsetTop) {
          const offsetToScroll = getOffset(elem, config.APP.scrollContainerSelector)
          document.querySelector(config.APP.scrollContainerSelector).scrollTo(0, offsetToScroll - 10);
          return;
        }
      }
      this.scrollPositionReset.doReset();
    }
  }
});
