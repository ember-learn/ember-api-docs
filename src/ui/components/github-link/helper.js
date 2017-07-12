import Ember from 'ember';
import githubMap from "../../../utils/github-map";

export function githubLink([project, version, file, line]) {
  return `https://github.com/${githubMap[project]}/tree/v${version}/${file}#L${line}`;
}

export default Ember.Helper.helper(githubLink);
