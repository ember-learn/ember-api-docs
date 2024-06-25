import { helper } from '@ember/component/helper';
import { htmlSafe as emberHtmlSafe } from '@ember/template';

export function htmlSafe([content]) {
  return emberHtmlSafe(content);
}

export default helper(htmlSafe);
