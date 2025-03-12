import Component from '@glimmer/component';

export default class ImportExample extends Component {
  get markdown() {
    let md = `\`\`\`js
import ${this.args.item} from '${this.args.package}';
\`\`\``;
    return md;
  }
}
