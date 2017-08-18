import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import config from 'ember-api-docs/config/environment';

export default Mixin.create({

  scrollPositionReset: service(),

  actions: {
    willTransition(transition) {
      this.get('scrollPositionReset').scheduleReset(transition);
    },

    didTransition() {
      this._super();
      if ((typeof FastBoot === 'undefined') && window.location.search === '?anchor=' ) {
        let elem = $('#methods');
        let offset = elem.offset() ? elem.offset().top : 0;
        if (offset) {
          $(config.APP.scrollContainerSelector).scrollTop(offset - 10);
          return;
        }
      }
      this.get('scrollPositionReset').doReset();
    }
  }
});
