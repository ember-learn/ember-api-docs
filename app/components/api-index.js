import Ember from 'ember';

export default Ember.Component.extend({

  sections: Ember.computed('itemData.methods', 'itemData.properties', 'itemData.events', function () {
    return [
      {
        title: 'Methods',
        items: this.get('itemData.methods'),
        class: 'api-methods'
      },
      {
        title: 'Properties',
        items: this.get('itemData.properties'),
        class: 'api-properties'
      },
      {
        title: 'Events',
        items: this.get('itemData.events'),
        class: 'api-events'
      }
    ];
  })

});
