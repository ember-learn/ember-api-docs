import Ember from 'ember';
import githubMap from 'ember-api-docs/utils/github-map';

const { computed, observer, inject, Controller } = Ember;

export default Controller.extend({
  router: inject.service('-routing'),
  currentTab: "index",

  routeName: computed.readOnly('router.currentRouteName'),
  parentName: computed('routeName', function() {
    const routeName = this.get('routeName');
    const routes = routeName.split('.');
    return routes.slice(0, 2).join('.');
  }),

  init() {
    this._super(...arguments);
    this.set('filterData', Ember.Object.create({
      showInherited: false,
      showProtected: false,
      showPrivate: false,
      showDeprecated: false
    }));
  },

  githubLinkTarget: computed('model.{file,line}', function() {
    const file = this.get('model.file');
    const line = this.get('model.line');
    const project = this.get('model.project.id');
    const version = this.get('model.projectVersion.version');
    const githubDir = githubMap[project];
    return `https://github.com/${githubDir}/tree/v${version}/${file}#L${line}`;
  }),

  // Makes me throw up a bit in my mouth, but we want to reset the tabs when the route changes.
  // The easiest way to do this was an observer.
  // Optimally, we move this state up to the route and set the tab there on route change. (TODO)
  resetTab: observer('model.name', function () {
    this.set('currentTab', "index");
  }),

  actions: {
    updateFilter(field) {
      this.toggleProperty(`filterData.${field}`);
    },

    navigateTab(tabName) {
      this.set('currentTab', tabName);
      this.transitionToRoute(`${this.get('parentName')}.${tabName}`);
    }
  }


});
