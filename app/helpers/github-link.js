import { helper } from '@ember/component/helper';
import githubMap from '../utils/github-map';

export function githubLink([project, version, file, line], { isEdit=false }) {
  if (isEdit) {
    return `https://github.com/${githubMap[project]}/edit/release/${file}#L${line}`;
  }
  return `https://github.com/${githubMap[project]}/tree/v${version}/${file}#L${line}`;
}

export default helper(githubLink);
