import semverCompare from 'npm:semver-compare';
import _ from 'lodash';

function _getVersionString(version) {
  return _.last(version.get('id').split('-'));
}

export default function getLastVersion(versions) {
  let lastVersion = versions.sort((a, b) => {
    let versionA = _getVersionString(a);
    let versionB = _getVersionString(b);
    return semverCompare(versionA, versionB);
  })[versions.length - 1];
  return _getVersionString(lastVersion);
}

