import { get } from '@ember/object';
import getCompactVersion from './get-compact-version';

export default function getFullVersion(projectObj, urlVersion) {
  const availableVersions = get(projectObj, 'availableVersions');

  if (urlVersion === 'release') {
    return availableVersions[0];
  }

  return availableVersions.find(v => getCompactVersion(v) === getCompactVersion(urlVersion));
}
