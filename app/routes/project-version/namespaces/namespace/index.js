import Ember from 'ember';
import HashRedirectMixin from '../../../../mixins/hash-redirect';

export default Ember.Route.extend(HashRedirectMixin, {
  templateName: 'class-index'

});
