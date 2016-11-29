import Ember from 'ember';
import githubMap from '../utils/github-map';

const { computed, Component } = Ember;

export default Component.extend({
  githubLinkTarget: computed('field.{file,line}', 'model', 'field', function() {
    const file = this.get('field.file');
    const line = this.get('field.line');
    const project = this.get('model.project.id');
    const version = this.get('field.version');
    const githubDir = githubMap[project];
    return `https://github.com/${githubDir}/tree/v${version}/${file}#L${line}`;
  }),

  didRender() {
    this._super(...arguments);
    this.$('section pre code').each((i, block) => {
      window.hljs.lineNumbersBlock(block);
    });
  }
});
