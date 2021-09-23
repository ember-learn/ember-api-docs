/* eslint-disable ember/no-computed-properties-in-native-classes, ember/classic-decorator-no-classic-methods */
import { computed } from '@ember/object';
import Component from '@ember/component';

export default class ApiIndex extends Component {
  @computed('itemData.{methods,properties,events}')
  get sections() {
    return [
      {
        title: 'Methods',
        tab: 'methods',
        items: this.get('itemData.methods'),
        class: 'spec-method-list',
        routeSuffix: '.methods.method',
      },
      {
        title: 'Properties',
        tab: 'properties',
        items: this.get('itemData.properties'),
        class: 'spec-property-list',
        routeSuffix: '.properties.property',
      },
      {
        title: 'Events',
        tab: 'events',
        items: this.get('itemData.events'),
        class: 'spec-event-list',
        routeSuffix: '.events.event',
      },
    ];
  }
}
