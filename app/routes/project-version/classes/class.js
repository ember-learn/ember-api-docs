import { resolve, all } from 'rsvp';
import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import createExcerpt from 'ember-api-docs/utils/create-excerpt';

export default Route.extend(ScrollTracker, {
  headData: service(),
  metaStore: service(),

  titleToken: function(model) {
    return get(model, 'name');
  },

  async model(params, transition) {
    let projectID = transition.params['project-version'].project;
    let projectObj = await this.store.findRecord('project', projectID);
    let compactVersion = transition.params['project-version'].project_version;
    let projectVersion = getFullVersion(compactVersion, projectID, projectObj, this.metaStore);
    const klass = params['class'];
    return this.find('class', `${projectID}-${projectVersion}-${klass}`);
  },

  find(typeName, param) {
    return this.store.find(typeName, param).catch((e1) => {
      if (typeName != 'namespace') {
        console.warn(e1, 'fetching by class or module failed, retrying as namespace');
        return this.store.find('namespace', param).catch((e2) => {
          console.error(e2);
          return resolve({
            isError: true,
            status: 404
          });
        });
      }
      console.error(e1);
      return resolve({
        isError: true,
        status: 404
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
      let description = klass.get('ogDescription') || klass.get('description')
      if (description) {
        set(this, 'headData.description', createExcerpt(description));
      }

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
      class: get(model, 'name')
    };
  }

});
