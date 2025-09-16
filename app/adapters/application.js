import { inject as service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { pluralize } from 'ember-inflector';
import { isBlank } from '@ember/utils';
import config from 'ember-api-docs/config/environment';

export default class Application extends JSONAPIAdapter {
  currentProject = '';
  currentProjectVersion = '';

  @service
  metaStore;

  @service('project')
  projectService;

  ids = null;

  shouldReloadRecord(store, { modelName, id }) {
    if (modelName === 'project') {
      this.currentProject = id;
    } else if (modelName === 'project-version') {
      this.currentProjectVersion = id;
    }
    return; // return undefined so auto determinated
  }

  shouldBackgroundReloadAll() {
    return false;
  }

  shouldBackgroundReloadRecord() {
    return false;
  }

  constructor() {
    super(...arguments);
    this.ids = {};
  }

  async findRecord(store, { modelName }, id) {
    let url;
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
        url = `json-docs/${projectName}/${version}/${pluralize(
          modelNameToUse,
        )}/${encodedRevId}`;
      } else {
        throw new Error('Documentation item not found');
      }
    } else if (modelName === 'missing') {
      let version = this.projectService.version;
      let revId = this.metaStore.getRevId(projectName, version, modelName, id);
      url = `json-docs/${projectName}/${version}/${pluralize(
        modelName,
      )}/${revId}`;
    } else if (modelName === 'project') {
      this.currentProject = id;
      url = `rev-index/${id}`;
    } else if (modelName === 'project-version') {
      this.currentProjectVersion = id;
      url = `rev-index/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    const base = this.fastboot.isFastBoot
      ? config.APP.domain
      : window.location.origin;

    url = `${base}/${url}.json`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`,
        );
      }
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(`Failed to fetch or parse JSON from ${url}:`, error);
      throw new Error(`Failed to load data for ${url}: ${error.message}`);
    }
  }
}
