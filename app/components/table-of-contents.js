import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Component.extend({

  transitionService: inject.service('transition'),
  currentParam: computed.alias('transitionService.newThirdParam'),
  currentNamespaceID: computed.alias('currentParam.namespace'),
  currentModuleID: computed.alias('currentParam.module'),
  currentClassID: computed.alias('currentParam.class'),

  actions: {
    toggle(type) {
      this.$('ol.toc-level-1.' + type).slideToggle(200);
    }
  }
});
