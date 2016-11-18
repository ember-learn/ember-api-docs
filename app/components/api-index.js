import Ember from 'ember';

export default Ember.Component.extend({

  sections: Ember.computed('itemData.methods', 'itemData.properties', 'itemData.events', function () {
    return [
      {
        title: 'Methods',
        tab: 'methods',
        items: this.get('itemData.methods'),
        class: 'spec-method-list',
        routeSuffix: '.methods.method'
      },
      {
        title: 'Properties',
        tab: 'properties',
        items: this.get('itemData.properties'),
        class: 'spec-property-list',
        routeSuffix: '.properties.property'
      },
      {
        title: 'Events',
        tab: 'events',
        items: this.get('itemData.events'),
        class: 'spec-event-list',
        routeSuffix: '.events.event'
      }
    ];
  })

});
