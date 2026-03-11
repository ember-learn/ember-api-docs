import Component from '@glimmer/component';
import MarkdownToHtml from "ember-cli-showdown/components/markdown-to-html";

export default class ImportExample extends Component {<template><MarkdownToHtml @markdown={{this.markdown}} /></template>
  get markdown() {
    let md = `\`\`\`js
import ${this.args.item} from '${this.args.package}';
\`\`\``;
    return md;
  }
}
