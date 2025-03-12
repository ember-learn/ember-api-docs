import Component from '@glimmer/component';

/**
 * @typedef ItemData
 * @property {Array<{ name: string }>} methods
 * @property {Array<{ name: string }>} properties
 * @property {Array<{ name: string }>} events
 */

/**
 * @typedef Args
 * @property {ItemData} itemData
 */

/**
 * @typedef Blocks
 * @property {[{ sections: ApiIndex['sections'] }]} default
 */

/**
 * @extends Component<{ Args: Args, Blocks: Blocks }>
 */
import { hash } from "@ember/helper";
export default class ApiIndex extends Component {<template><div>
{{yield (hash sections=this.sections)}}
</div></template>
  get sections() {
    return [
      {
        title: 'Methods',
        tab: 'methods',
        items: this.args.itemData.methods,
        class: 'spec-method-list',
        routeSuffix: '.methods.method',
      },
      {
        title: 'Properties',
        tab: 'properties',
        items: this.args.itemData.properties,
        class: 'spec-property-list',
        routeSuffix: '.properties.property',
      },
      {
        title: 'Events',
        tab: 'events',
        items: this.args.itemData.events,
        class: 'spec-event-list',
        routeSuffix: '.events.event',
      },
    ];
  }
}
