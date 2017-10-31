import { hash, resolve } from 'rsvp';
import Route from '@ember/routing/route';
//import getLastVersion from 'ember-api-docs/utils/get-last-version';
import { pluralize } from 'ember-inflector';

export default Route.extend({

  model(params) {
    return this.get('store').findRecord('project', 'ember-data', { includes: 'project-version' })
      .then((project) => {
        // let versions = project.get('projectVersions').toArray();
        // let lastVersion = getLastVersion(versions);
        let lastVersion = '2.15.3';
        return this.get('store').findRecord('project-version', `ember-data-${lastVersion}`, { includes: 'project' });
      })
      .then((projectVersion) => {
        let project = projectVersion.get('project');
        let lastVersion = projectVersion.get('version');
        let className = params['class'].substr(0, params['class'].lastIndexOf('.'));
        let id = `ember-data-${lastVersion}-${className}`;
        return hash({
          project: resolve(project),
          version: resolve(lastVersion),
          classData: this.store.find('class', id)
            .then((classData) => {
              return {
                type: 'class',
                data: classData
              };
            })
            .catch(() => {
              return this.store.find('namespace', id).then((classData) => {
                return {
                  type: 'namespace',
                  data: classData
                };
              });
            })
            .catch((e) => {
              return this.transitionTo('project-version');
            })
        });
      });
  },

  redirect(model) {
    return this.transitionTo(`project-version.${pluralize(model.classData.type)}.${model.classData.type}`,
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
