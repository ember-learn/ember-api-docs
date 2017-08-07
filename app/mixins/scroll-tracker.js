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
      let isAnchorEmpty = window && window.location && window.location.search === '?anchor='
      if ((typeof FastBoot === 'undefined') && isAnchorEmpty ) {
        let elem = $('#methods');
        let offset = (elem && elem.offset && elem.offset()) ? elem.offset().top : null;
        if (offset) {
          const navMenuHeight = $('header').outerHeight();
          $(config.APP.scrollContainerSelector).scrollTop(offset - navMenuHeight - 10);
        }
      } else {
        this.get('scrollPositionReset').doReset();
      }
    }
  }
});
