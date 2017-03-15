import DS from 'ember-data';
import Ember from 'ember';
import fetch from 'ember-network/fetch';

const {
  Inflector: { inflector },
  inject: { service }
} = Ember;

const { JSONAPIAdapter } = DS;


export default JSONAPIAdapter.extend({

  fastboot: service(),

  currentProject: '',

  currentProjectVersion: '',

  findRecord(store, {modelName}, id) {
    let url;
    let projectName = this.get('currentProject');

    if (['namespace', 'class', 'module'].includes(modelName)) {
      let [version] = id.replace(`${projectName}-`, '').split('-');
      url = `${projectName}/${version}/${inflector.pluralize(modelName)}/${id}`;
    } else if (modelName === 'missing') {
      let version = Ember.getOwner(this).lookup('controller:project-version').get('model.version');
      url = `${projectName}/${version}/missings/${id}`
    } else if (modelName === 'project') {
      this.set('currentProject', id);
      url = `${id}/${inflector.pluralize(modelName)}/${id}`;
    } else if (modelName === 'project-version') {
      let version = id.replace(`${projectName}-`, '');
      url = `${projectName}/${version}/${inflector.pluralize(modelName)}/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    url = `/json-docs/${url}.json`;

    let fastboot = this.get('fastboot');
    if (fastboot.get('isFastBoot')) {
      let { protocol, host } = fastboot.get('request').getProperties(['protocol', 'host']);
      url = `${protocol}://${host}${url}`;
    }

    return fetch(url).then(response => response.json());
  }

});

