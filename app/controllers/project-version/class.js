import Ember from 'ember';
import _ from 'lodash/lodash';

const { computed, inject, Controller } = Ember;

export default Controller.extend({
  router: inject.service('-routing'),
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

  actions: {
    updateFilter(field) {
      this.toggleProperty(`filterData.${field}`);
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
