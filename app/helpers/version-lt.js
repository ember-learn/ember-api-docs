import { helper } from '@ember/component/helper';
/**
 * Converts a compact version string like '2.16' into an int array [2, 16]
 */
function toIntArray(versionStr) {
  let versionStrArray = versionStr.split('.');
  return versionStrArray.map(item => parseInt(item))
}

function major(versionArray) {
  return versionArray[0];
}

function minor(versionArray) {
  return versionArray[1];
}

export function versionLt(params/*, hash*/) {
  let currentVersionArray = toIntArray(params[0]);
  let compareToVersionArray = toIntArray(params[1]);
  return major(currentVersionArray) < major(compareToVersionArray) ||
    (major(currentVersionArray) === major(compareToVersionArray) &&
     minor(currentVersionArray) < minor(compareToVersionArray));
}

export default helper(versionLt);

