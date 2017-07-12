import DS from 'ember-data';
import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'ember-api-docs/config/environment';


export default DS.JSONAPIAdapter.extend({

  host: ENV.API_HOST,

  currentProject: '',

  currentProjectVersion: '',

  metaStore: Ember.inject.service(),
  projectService: Ember.inject.service('project'),

  async findRecord(store, {modelName}, id) {
    let url;
    let host = this.get('host');
    let projectName = this.get('currentProject');

    if (['namespace', 'class', 'module'].includes(modelName)) {
      let [version] = id.replace(`${projectName}-`, '').split('-');
      let revId = this.get('metaStore').getRevId(projectName, version, modelName, id);
      url = `json-docs/${projectName}/${version}/${Ember.Inflector.inflector.pluralize(modelName)}/${revId}`;
    } else if (modelName === 'missing') {
      let version = this.get('projectService.version');
      let revId = this.get('metaStore').getRevId(projectName, version, modelName, id);
      url = `json-docs/${projectName}/${version}/${Ember.Inflector.inflector.pluralize(modelName)}/${revId}`;
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
    return response.json();
  }

});

