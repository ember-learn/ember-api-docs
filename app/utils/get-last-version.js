import semverCompare from 'npm:semver-compare';

export default function getLastVersion(projectVersions) {
  const sortedVersions = projectVersions.getEach('id').map(v => v.split('-')[1]).sort((v1, v2) => {
    return semverCompare(v1, v2);
  });
  return sortedVersions[sortedVersions.length - 1];
}

