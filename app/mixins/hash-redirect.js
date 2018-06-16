import Mixin from '@ember/object/mixin';
import { hasRedirectableHash, hashToUrl } from '../utils/hash-to-url';

export default Mixin.create({

  afterModel() {
    this._super(...arguments);
    if (hasRedirectableHash(window)) {
      this.transitionTo(hashToUrl(window));
    }
  }

});
