import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'ember-api-docs/config/environment';
import { pluralize } from 'ember-inflector';
import { isBlank } from '@ember/utils';

export default JSONAPIAdapter.extend({

  host: ENV.API_HOST,

  currentProject: '',

  currentProjectVersion: '',

  metaStore: service(),
  projectService: service('project'),

  ids: null,

  shouldReloadRecord(store, { modelName, id }) {
    if (modelName === 'project') {
      this.currentProject = id;
    } else if (modelName === 'project-version') {
      this.currentProjectVersion = id;
    }
    return; // return undefined so auto determinated
  },
  shouldBackgroundReloadAll() { return false; },
  shouldBackgroundReloadRecord(store, { modelName, id }) {
    let key = `${modelName}-${id}`;
    let hasId = this.ids[key];
    if (!hasId) {
      this.ids[key] = true;
    }
    return !hasId;
  },

  init() {
    this._super(...arguments);
    this.ids = {};
  },

  async findRecord(store, { modelName }, id) {
    let url;
    let host = this.host;
    let projectName = this.currentProject;

    if (['namespace', 'class', 'module'].indexOf(modelName) > -1) {
      let [version] = id.replace(`${projectName}-`, '').split('-');
      let revId = this.metaStore.getRevId(projectName, version, modelName, id);

      let modelNameToUse = modelName;
      // To account for namespaces that are also classes but not defined properly in yuidocs
      if (isBlank(revId) && modelNameToUse === 'class') {
        revId = this.metaStore.getRevId(projectName, version, 'namespace', id);
        modelNameToUse = 'namespace';
      }

      if (typeof revId !== 'undefined') {
        let encodedRevId = encodeURIComponent(revId);
        url = `json-docs/${projectName}/${version}/${pluralize(modelNameToUse)}/${encodedRevId}`;
      } else {
        throw new Error('Documentation item not found');
      }
    } else if (modelName === 'missing') {
      let version = this.get('projectService.version');
      let revId = this.metaStore.getRevId(projectName, version, modelName, id);
      url = `json-docs/${projectName}/${version}/${pluralize(modelName)}/${revId}`;
    } else if (modelName === 'project') {
      this.currentProject = id;
      url = `rev-index/${id}`;
    } else if (modelName === 'project-version') {
      this.currentProjectVersion = id;
      url = `rev-index/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    url = `${host}/${url}.json`;

    let response = await fetch(url);
    let json = await response.json();
    return json;
  }

});
