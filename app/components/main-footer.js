import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  tagName: '',

  currentYear: computed(function() {
    return new Date().getUTCFullYear();
  })

});
