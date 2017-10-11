import { hash, resolve } from 'rsvp';
import Route from '@ember/routing/route';
import getLastVersion from 'ember-api-docs/utils/get-last-version';

import { pluralize } from 'ember-inflector';

export default Route.extend({

  model(params) {
    return this.get('store').findRecord('project', 'ember', { includes: 'project-version' })
      .then(project => {
        console.log('routes:module: found project');
        let versions = project.get('projectVersions').toArray();
        console.log('routes:module: versions', versions);
        let lastVersion = getLastVersion(versions);
        let className = params['module'].substr(0, params['module'].lastIndexOf('.'));
        console.log('routes:module: className', className);
        let id = `ember-${lastVersion}-${className}`;
        console.log('routes:module: id', id);

        return hash({
          project: resolve(project),
          version: resolve(lastVersion),
          classData: this.store.find('module', id).then(classData => {
            console.log('routes:module:found module', id, classData);
            return { type: 'module', data: classData };
          })

        });
      }).catch((e) => {
        console.log('routes:module:caught exception', e);
        return this.transitionTo('project-version');
      });
  },

  redirect(model) {
    console.log('routes:module:redirecting to', `project-version.${pluralize(model.classData.type)}.${model.classData.type}`);
    return this.transitionTo(`project-version.${pluralize(model.classData.type)}.${model.classData.type}`,
      model.project.id,
      model.version,
      model.classData.data.get('name'));
  },

  serialize(model) {
    console.log('routes:module:serializing', model.classData.get('name'));
    return {
      namespace: model.classData.get('name')
    }
  }

});
