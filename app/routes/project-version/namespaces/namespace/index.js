import Ember from 'ember';
import HashRedirectMixin from 'ember-api-docs/mixins/hash-redirect';

export default Ember.Route.extend(HashRedirectMixin, {
  templateName: 'class-index'

});
