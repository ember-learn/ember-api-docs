import getCompactVersion from 'ember-api-docs/utils/get-compact-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

export default function getFullVersion(urlVersion, project, projectObj, metaStore) {
  let projectVersion;
  if (urlVersion === 'release') {
    let versions = projectObj.hasMany('projectVersions').ids();
    projectVersion = metaStore.getFullVersion(project, getCompactVersion(getLastVersion(versions)));
  } else {
    projectVersion = metaStore.getFullVersion(project, urlVersion);
  }

  return projectVersion;
}
