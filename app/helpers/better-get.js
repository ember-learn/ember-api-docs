import { helper } from '@ember/component/helper';
/**
 * gives a similar functionality to the get helper, but it supports dot separated
 * object keys.
 */
export function betterGet(params/*, hash*/) {
  return params[0][params[1]];
}

export default helper(betterGet);
