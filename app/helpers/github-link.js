import { helper } from '@ember/component/helper';
import githubMap, { mainDir } from '../utils/github-map';

/**
 * https://github.com/emberjs/data/tree/v4.10.0/packages/packages/
 *   store/addon/-private/record-arrays/identifier-array.ts#L118
 *
 * File: ../packages/store/addon/-private/record-arrays/identifier-array.ts
 */
export function githubLink([project, version, file, line], { isEdit = false }) {
  if (isEdit) {
    return `https://github.com/${githubMap[project]}/edit/release${mainDir(
      project,
      version
    )}${file}#L${line}`;
  }

  // If the file has packages already in the path, make sure we don't
  // add duplicate packages via the mainDir function.
  // Fixes an issue with ember data URLS having an incorrect
  // 'packages/packages' in the GitHub source URL
  const fixedFile = file.replace('../packages/', '../');

  const result = `https://github.com/${
    githubMap[project]
  }/tree/v${version}${mainDir(project, version)}${fixedFile}#L${line}`;
  return result;
}

export default helper(githubLink);
