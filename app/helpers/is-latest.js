import { helper } from '@ember/component/helper';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

export function isLatest(params, { version, allVersions}) {
  let latestVersion = getLastVersion(allVersions);
  return version === latestVersion;
}

export default helper(isLatest);
