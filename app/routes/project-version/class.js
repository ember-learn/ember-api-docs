import Ember from 'ember';

const {get} = Ember;

export default Ember.Route.extend({

  model(params, transition) {
    const projectID = transition.params['project-version'].project;
    const version = transition.params['project-version'].project_version;
    const klass = params.class;

    return this.store.find('class', `${projectID}-${version}-${klass}`);
  },

  afterModel(klass) {
    const relationships = get(klass.constructor, 'relationshipNames');

    const promises = Object.keys(relationships).reduce((memo, relationshipType) => {
      const relationshipPromises = relationships[relationshipType].map(name => klass.get(name));
      return memo.concat(relationshipPromises);
    }, []);

    return Ember.RSVP.all(promises);
  },

  serialize(model) {
    return {
      class: model.get('name')
    }
  }
});
