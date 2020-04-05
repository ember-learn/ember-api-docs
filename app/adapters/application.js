import { get } from '@ember/object';
import { isBlank } from '@ember/utils';
import ENV from 'ember-api-docs/config/environment';
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';
import fetch from 'fetch';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  host: ENV.API_HOST,

  currentProject: '',

  currentProjectVersion: '',

  shouldBackgroundReloadAll() {
    return false;
  },

  shouldBackgroundReloadRecord() {
    return false;
  },

  setCurrentProjectInfo(id) {
    let [project, version] = id.split('-');
    this.currentProjectVersion = version;
    this.currentProject = project;
  },

  getRevId(type, id) {
    let encodedId = encodeURIComponent(id);
    let projectVersionDoc = this.store.peekRecord(
      'project-version',
      `${this.currentProject}-${this.currentProjectVersion}`
    );
    return get(projectVersionDoc, 'revMap')[type][encodedId];
  },

  async findRecord(store, { modelName }, id) {
    let url;
    let host = this.host;
    let projectName = this.currentProject;

    if (['namespace', 'class', 'module'].indexOf(modelName) > -1) {
      if (isBlank(this.currentProjectVersion)) {
        this.setCurrentProjectInfo(id);
      }

      let version = this.currentProjectVersion;
      let revId = this.getRevId(modelName, id);

      let modelNameToUse = modelName;
      // To account for namespaces that are also classes but not defined properly in yuidocs
      if (isBlank(revId) && modelNameToUse === 'class') {
        revId = this.getRevId('namespace', id);
        modelNameToUse = 'namespace';
      }

      if (typeof revId != 'undefined') {
        let encodedRevId = encodeURIComponent(revId);
        url = `json-docs/${projectName}/${version}/${pluralize(modelNameToUse)}/${encodedRevId}`;
      } else {
        throw new Error('Documentation item not found');
      }
    } else if (modelName === 'missing') {
      let version = this.currentProjectVersion;
      let revId = this.getRevId(modelName, id);
      url = `json-docs/${projectName}/${version}/${pluralize(modelName)}/${revId}`;
    } else if (modelName === 'project') {
      this.currentProject = id;
      url = `rev-index/${id}`;
    } else if (modelName === 'project-version') {
      this.setCurrentProjectInfo(id);
      url = `rev-index/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    url = `${host}/${url}.json`;

    let response = await fetch(url);
    let json = await response.json();
    return json;
  },
});
