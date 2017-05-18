import Ember from 'ember';
import { hasRedirectableHash, hashToUrl } from '../utils/hash-to-url';

export default Ember.Mixin.create({

  afterModel(model, transition) {
    this._super(...arguments);
    if (hasRedirectableHash(window)) {
      this.transitionTo(hashToUrl(window));
    }
  }

});
