import semverCompare from 'semver-compare';

export default function getLastVersion(projectVersions) {
  const sortedVersions = projectVersions.map(v => v.replace(/ember-data-|ember-/g, '')).sort((v1, v2) => {
    return semverCompare(v1, v2);
  });
  return sortedVersions[sortedVersions.length - 1];
}
