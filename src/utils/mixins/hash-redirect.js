import Ember from 'ember';
import { hasRedirectableHash, hashToUrl } from "../hash-to-url/util";

export default Ember.Mixin.create({

  afterModel(model, transition) {
    this._super(...arguments);
    if (hasRedirectableHash(window)) {
      this.transitionTo(hashToUrl(window));
    }
  }

});
