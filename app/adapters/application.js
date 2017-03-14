import DS from 'ember-data';
import Ember from 'ember';

const { Inflector: { inflector } } = Ember;

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({

  currentProject: '',

  findRecord(store, {modelName}, id) {
    let url;
    let projectName = this.get('currentProject');

    if (['namespace', 'class', 'module'].includes(modelName)) {
      let [version] = id.replace(`${projectName}-`, '').split('-');
      url = `${projectName}/${version}/${inflector.pluralize(modelName)}/${id}`;
    } else if (modelName === 'missing') {
      url = `${projectName}/missings/${id}`
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
    return fetch(url).then(response => response.json());
  }

});

