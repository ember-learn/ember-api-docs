import { helper } from '@ember/component/helper';
import { A } from '@ember/array';

export function functionHeadingId([heading]/*, hash*/) {
  return `functions-${A(heading.split('/')).get('lastObject')}`;
}

export default helper(functionHeadingId);
