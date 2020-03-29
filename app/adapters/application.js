import { inject as service } from '@ember/service';
import DS from 'ember-data';
import fetch from 'fetch';
import ENV from 'ember-api-docs/config/environment';
import { pluralize } from 'ember-inflector';
import { isBlank } from '@ember/utils';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({

  host: ENV.API_HOST,

  currentProject: '',

  currentProjectVersion: '',

  metaStore: service(),
  projectService: service('project'),

  shouldBackgroundReloadAll() { return false; },
  shouldBackgroundReloadRecord() { return false; },

  async findRecord(store, {modelName}, id) {
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

      if (typeof revId != 'undefined') {
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
      this.set('currentProject', id);
      url = `rev-index/${id}`;
    } else if (modelName === 'project-version') {
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
