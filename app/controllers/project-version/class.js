import Ember from 'ember';
import _ from 'lodash/lodash';
import githubMap from 'ember-api-docs/utils/github-map';

const { computed, inject, Controller } = Ember;

export default Controller.extend({
  router: inject.service('-routing'),
  routeName: computed.readOnly('router.currentRouteName'),
  parentName: computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 2).join('.');
  }),

  filteredMethods: computed('model.methods.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('methods');
  }),

  filteredEvents: computed('model.events.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('events');
  }),

  filteredProperties: computed('model.properties.[]', 'showInherited', 'showProtected', 'showPrivate', 'showDeprecated', function() {
    return this.filterItems('properties');
  }),

  filterItems(itemType) {
    let items = this.get('model.' + itemType);
    if (!this.get('showInherited')) {
      items = items.filter(item => item.inherited !== true);
    }
    if (!this.get('showProtected')) {
      items = items.filter(item => item.access !== 'protected');
    }
    if (!this.get('showPrivate')) {
      items = items.filter(item => item.access !== 'private');
    }
    if (!this.get('showDeprecated')) {
      items = items.filter(item => item.deprecated !== true);
    }
    return _.uniq(_.sortBy(items, 'name'), true, (item => item.name));
  },

  githubLinkTarget: computed('model.{file,line}', function() {
    const file = this.get('model.file');
    const line = this.get('model.line');
    const project = this.get('model.project.id');
    const version = this.get('model.projectVersion.version');
    const githubDir = githubMap[project];
    return `https://github.com/${githubDir}/tree/v${version}/${file}#L${line}`;
  })
});
