import { helper } from '@ember/component/helper';
import githubMap, { mainDir } from '../utils/github-map';

export function githubLink([project, version, file, line], { isEdit = false }) {
  // Adjust version if it's a `v6.0.x` pattern to match the Git tags
  const adjustedVersion = version.startsWith('v6.0.')
    ? `${version}-ember-source`
    : version;

  if (isEdit) {
    return `https://github.com/${githubMap[project]}/edit/release${mainDir(
      project,
      adjustedVersion
    )}${file}#L${line}`;
  }

  // This 'packages' replacement can be removed if the following PR goes into a patch release of
  // Ember Data 4.12: https://github.com/emberjs/data/pull/8598/files
  //
  // If the file has packages already in the path, make sure we don't
  // add duplicate packages via the mainDir function.
  // Fixes an issue with ember data URLS having an incorrect
  // 'packages/packages' in the GitHub source URL
  // For example, without this fixedFile line, a `file` with value
  // '../packages/store/addon/-private/record-arrays/identifier-array.ts'
  // would become
  // 'https://github.com/emberjs/data/tree/v4.10.0/packages/packages/store/addon/-private/record-arrays/identifier-array.ts#L118'
  const fixedFile = file?.replace('../packages/', '../');

  return `https://github.com/${githubMap[project]}/tree/${adjustedVersion}${mainDir(
    project,
    adjustedVersion
  )}${fixedFile}#L${line}`;
}

export default helper(githubLink);
