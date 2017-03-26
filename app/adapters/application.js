import DS from 'ember-data';
import Ember from 'ember';
import fetch from 'ember-network/fetch';
import ENV from 'ember-api-docs/config/environment';

const {
  Inflector: { inflector },
  inject: { service }
} = Ember;

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({

  host: ENV.API_HOST,

  currentProject: '',

  currentProjectVersion: '',

  session: service(),

  findRecord(store, {modelName}, id) {
    let url;
    let host = this.get('host');
    let projectName = this.get('currentProject');

    if (['namespace', 'class', 'module'].includes(modelName)) {
      let [version] = id.replace(`${projectName}-`, '').split('-');
      let revId = this.get('session').getRevId(projectName, version, modelName, id);
      url = `json-docs-1/${projectName}/${version}/${inflector.pluralize(modelName)}/${revId}`;
    } else if (modelName === 'missing') {
      let version = Ember.getOwner(this).lookup('controller:project-version').get('model.version');
      let revId = this.get('session').getRevId(projectName, version, modelName, id);
      url = `json-docs-1/${projectName}/${version}/${inflector.pluralize(modelName)}/${revId}`;
    } else if (modelName === 'project') {
      this.set('currentProject', id);
      url = `rev-index/${id}`;
    } else if (modelName === 'project-version') {
      url = `rev-index/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    url = `${host}/${url}.json`;

    return fetch(url).then(response => response.json());
  }

});

