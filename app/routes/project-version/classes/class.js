import { inject as service } from '@ember/service';
import { resolve, all } from 'rsvp';
import Route from '@ember/routing/route';
import { set } from '@ember/object';

import getFullVersion from 'ember-api-docs/utils/get-full-version';
import createExcerpt from 'ember-api-docs/utils/create-excerpt';

export default class ClassRoute extends Route {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  headData;

  @service
  metaStore;

  @service store;

  async model(params) {
    const { project, project_version: compactVersion } =
      this.paramsFor('project-version');
    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(
      compactVersion,
      project,
      projectObj,
      this.metaStore
    );
    const klass = params['class'];
    return this.find(
      'class',
      `${project}-${projectVersion}-${klass}`.toLowerCase()
    );
  }

  find(typeName, param) {
    return this.store.find(typeName, param).catch((e1) => {
      if (typeName != 'namespace') {
        console.warn(
          e1,
          'fetching by class or module failed, retrying as namespace'
        );
        return this.store.find('namespace', param).catch((e2) => {
          console.error(e2);
          return resolve({
            isError: true,
            status: 404,
          });
        });
      }
      console.error(e1);
      return resolve({
        isError: true,
        status: 404,
      });
    });
  }

  redirect(model) {
    if (model.isError) {
      let error = new Error(
        'Error retrieving model in routes/project-version/classes/class'
      );

      error.status = 404;

      throw error;
    }
  }

  afterModel(klass) {
    if (!klass.isError) {
      let description = klass.get('ogDescription') || klass.get('description');
      if (description) {
        set(this, 'headData.description', createExcerpt(description));
      }

      const relationships = klass.constructor.relationshipNames;
      const promises = Object.keys(relationships).reduce(
        (memo, relationshipType) => {
          const relationshipPromises = relationships[relationshipType].map(
            (name) => klass.get(name)
          );
          return memo.concat(relationshipPromises);
        },
        []
      );
      return all(promises);
    }
  }

  serialize(model) {
    return {
      class: model.name,
    };
  }
}
