import { resolve, all } from 'rsvp';
import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';

export default Route.extend(ScrollTracker, {

  headData: service(),

  metaStore: service(),

  titleToken: function(model) {
    return model.get('name');
  },

  model(params, transition) {
    return this.getModel('class', params, transition);
  },

  getModel(typeName, params, transition) {
    const projectID = transition.params['project-version'].project;
    let compactVersion = transition.params['project-version'].project_version;
    const projectVersion = this.get('metaStore').getFullVersion(projectID, compactVersion);

    const klass = params[typeName];
    return this.find(typeName, `${projectID}-${projectVersion}-${klass}`);
  },

  find(typeName, param) {
    return this.store.find(typeName, param).catch(() => {
      return this.store.find('namespace', param).catch(() => {
        return resolve({ isError: true });
      });
    });
  },

  redirect(model, transition) {
    if (transition.queryParams.anchor && transition.queryParams.type) {
      let type = transition.queryParams.type;
      this.transitionTo(`project-version.classes.class.${pluralize(type)}.${type}`,
        transition.params['project-version'].project,
        transition.params['project-version'].project_version,
        transition.params['project-version.classes.class'].class,
        transition.queryParams.anchor);
    }
    if (model.isError) {
      this.transitionTo('404');
    }
  },

  afterModel(klass) {
    if (!klass.isError) {
      set(this, 'headData.description', klass.get('ogDescription'));
      const relationships = get(klass.constructor, 'relationshipNames');
      const promises = Object.keys(relationships).reduce((memo, relationshipType) => {
        const relationshipPromises = relationships[relationshipType].map(name => klass.get(name));
        return memo.concat(relationshipPromises);
      }, []);
      return all(promises);
    }
  },

  serialize(model) {
    return {
      class: model.get('name')
    };
  }

});
