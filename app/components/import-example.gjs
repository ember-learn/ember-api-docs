import Component from '@glimmer/component';
import MarkdownToHtml from 'ember-cli-showdown/components/markdown-to-html';

export default class ImportExample extends Component {
  get markdown() {
    if (this.args.exampleimport) {
      return `\`\`\`js
${this.args.exampleimport}
\`\`\``;
    }
    return `\`\`\`js
import ${this.args.item} from '${this.args.package}';
\`\`\``;
  }

  <template><MarkdownToHtml @markdown={{this.markdown}} /></template>
}
