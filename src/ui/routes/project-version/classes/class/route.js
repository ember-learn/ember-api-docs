import Ember from 'ember';
import ScrollTracker from "ember-api-docs/src/utils/mixins/scroll-tracker/mixin";


export default Ember.Route.extend(ScrollTracker, {

  headData: Ember.inject.service(),

  metaStore: Ember.inject.service(),

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
        return Ember.RSVP.resolve({ isError: true });
      });
    });
  },

  redirect(model, transition) {
    if (model.isError) {
      this.transitionTo('404');
    }
  },

  afterModel(klass) {
    if (!klass.isError) {
      Ember.set(this, 'headData.description', klass.get('ogDescription'));
      const relationships = Ember.get(klass.constructor, 'relationshipNames');
      const promises = Object.keys(relationships).reduce((memo, relationshipType) => {
        const relationshipPromises = relationships[relationshipType].map(name => klass.get(name));
        return memo.concat(relationshipPromises);
      }, []);
      return Ember.RSVP.all(promises);
    }
  },

  serialize(model) {
    return {
      class: model.get('name')
    };
  }

});
