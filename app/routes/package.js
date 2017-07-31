import Ember from 'ember';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

const { Inflector: { inflector }} = Ember;

export default Ember.Route.extend({

  model(params) {
    return this.get('store').findRecord('project', 'ember', { includes: 'project-version' })
      .then(project => {
        let versions = project.get('projectVersions').toArray();
        let lastVersion = getLastVersion(versions);
        let className = params['package'].substr(0, params['package'].lastIndexOf('.'));
        let id = `ember-${lastVersion}-${className}`;

        return Ember.RSVP.hash({
          project: Ember.RSVP.resolve(project),
          version: Ember.RSVP.resolve(lastVersion),
          classData: this.store.find('package', id).then(classData => {
            return { type: 'package', data: classData };
          })

        });
      }).catch((e) => {
        return this.transitionTo('project-version');
      });
  },

  redirect(model) {
    return this.transitionTo(`project-version.${inflector.pluralize(model.classData.type)}.${model.classData.type}`,
      model.project.id,
      model.version,
      model.classData.data.get('name'));
  },

  serialize(model) {
    return {
      namespace: model.classData.get('name')
    }
  }

});
