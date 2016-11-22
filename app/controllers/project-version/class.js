import Ember from 'ember';
import githubMap from 'ember-api-docs/utils/github-map';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';

const { computed, Controller } = Ember;

export default Controller.extend(ParentNameMixin, {
  filterData: Ember.inject.service(),

  githubLinkTarget: computed('model.{file,line}', function() {
    const file = this.get('model.file');
    const line = this.get('model.line');
    const project = this.get('model.project.id');
    const version = this.get('model.projectVersion.version');
    const githubDir = githubMap[project];
    return `https://github.com/${githubDir}/tree/v${version}/${file}#L${line}`;
  }),

  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    }
  }
});
