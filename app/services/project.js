import { computed } from '@ember/object';
import Service from '@ember/service';
import get from 'ember-metal/get';

export default Service.extend({
  version: '0.0.0',

  setVersion(version) {
    this.set('version', version);
  }
});
