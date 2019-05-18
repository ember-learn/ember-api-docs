import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollTracker from 'ember-api-docs/mixins/scroll-tracker';
import createExcerpt from 'ember-api-docs/utils/create-excerpt';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import { pluralize } from 'ember-inflector';
import { all, resolve } from 'rsvp';

export default Route.extend(ScrollTracker, {
  headData: service(),
  metaStore: service(),

  titleToken: function(model) {
    return get(model, 'name');
  },

  async model(params, transition) {
    const lookupParams = (routeName) => {
      let route = transition.routeInfos.find(({name}) => name === routeName);
      return route ? route.params : {}
    };

    let {
      project: projectID,
      project_version: compactVersion
    } = lookupParams('project-version');

    let projectObj = await this.store.findRecord('project', projectID);
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
    const lookupParams = (routeName) => {
      let route = transition.routeInfos.find(({name}) => name === routeName);
      return route ? route.params : {}
    }

    let { to: { queryParams } } = transition;

    if (queryParams.anchor && queryParams.type) {
      let type = queryParams.type;
      this.transitionTo(
        `project-version.classes.class.${pluralize(type)}.${type}`,
        lookupParams('project-version').project,
        lookupParams('project-version').project_version,
        lookupParams('project-version.classes.class').class,
        queryParams.anchor
      );
    }
    if (model.isError) {
      this.transitionTo('404');
    }
  },

  afterModel(klass) {
    if (!klass.isError) {
      let description = klass.get('ogDescription') || klass.get('description');
      if (description) {
        set(this, 'headData.description', createExcerpt(description));
      }

      const relationships = get(klass.constructor, 'relationshipNames');
      const promises = Object.keys(relationships).reduce((memo, relationshipType) => {
        const relationshipPromises = relationships[relationshipType].map((name) => klass.get(name));
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
