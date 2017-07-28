import { helper } from '@ember/component/helper';
import { htmlSafe as emberHtmlSafe } from '@ember/string';

export function htmlSafe([content]) {
  return emberHtmlSafe(content);
}

export default helper(htmlSafe);
